import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button, Card, ListGroup } from 'react-bootstrap'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { Buffer } from 'buffer';


// @ts-ignore
window.Buffer = Buffer;

const projectID = "Your-project-ID";
const projectSecretKey = "Your-project-secret-key";
const auth = `Basic ${Buffer.from(`${projectID}:${projectSecretKey}`).toString("base64")}`;

const client = ipfsHttpClient({
    host: "infura-ipfs.io",
    protocol: "https",
    port: 5001,
    headers: {
        authorization: auth,
    },
});

const Home = ({ contract }) => {
    const [posts, setPosts] = useState('')
    const [hasProfile, setHasProfile] = useState(false)
    const [post, setPost] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(true)
    const loadPosts = async () => {
        // Get user's address
        let address = await contract.signer.getAddress()
        setAddress(address)
        // Check if user owns an nft
        // and if they do set profile to true
        const balance = await contract.balanceOf(address)
        setHasProfile(() => balance > 0)
        // Get all posts
        let results = await contract.getAllPosts()
        // Fetch metadata of each post and add that to post object.
        let posts = await Promise.all(results.map(async i => {
            // use hash to fetch the post's metadata stored on ipfs 
            let response = await fetch(`https://dtavern.infura-ipfs.io/ipfs/${i.hash}`)
            const metadataPost = await response.json()
            // get authors nft profile
            const nftId = await contract.profiles(i.author)
            // get uri url of nft profile
            const uri = await contract.tokenURI(nftId)
            // fetch nft profile metadata
            response = await fetch(uri)
            const metadataProfile = await response.json()
            // define author object
            const author = {
                address: i.author,
                username: metadataProfile.username,
                avatar: metadataProfile.avatar,
                guild: metadataProfile.guild
            }
            // define post object
            let post = {
                id: i.id,
                content: metadataPost.post,
                tipAmount: i.tipAmount,
                author
            }
            return post
        }))
        posts = posts.sort((a, b) => b.tipAmount - a.tipAmount)
        // Sort posts from most tipped to least tipped. 
        setPosts(posts)
        setLoading(false)
    }
    useEffect(() => {
        if (!posts) {
            loadPosts()
        }
    })
    const uploadPost = async () => {
        if (!post) return
        let hash
        // Upload post to IPFS
        try {
            const result = await client.add(JSON.stringify({ post }))
            setLoading(true)
            hash = result.path
        } catch (error) {
            window.alert("ipfs image upload error: ", error)
        }
        // upload post to blockchain
        await (await contract.uploadPost(hash)).wait()
        loadPosts()
    }
    const tip = async (post) => {
        // tip post owner
        await (await contract.tipPostOwner(post.id, { value: ethers.utils.parseEther("0.1") })).wait()
        loadPosts()
    }
    if (loading) return (
        <div className='text-center'>
            <main style={{ padding: "1rem 0" }}>
                <h2>Loading...</h2>
            </main>
        </div>
    )
    return (
        <div className="container-fluid mt-5">
            {hasProfile ?
                (<div className="row">
                    <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '500px' }}>
                        <div className="content mx-auto">
                            <Row className="g-4">
                                <Form.Control onChange={(e) => setPost(e.target.value)} size="lg" required as="textarea" />
                                <div className="d-grid px-0">
                                    <Button onClick={uploadPost} variant="outline-warning" size="lg">
                                        Post!
                                    </Button>
                                </div>
                            </Row>
                        </div>
                    </main>
                </div>)
                :
                (<div className="text-center">
                    <main style={{ padding: "1rem 0" }}>
                        <h2 style={{color: "whitesmoke"}}>Must own an NFT to post</h2>
                    </main>
                </div>)
            }

            <p>&nbsp;</p>
            <hr />
            <p className="my-auto">&nbsp;</p>
            {posts.length > 0 ?
                posts.map((post, key) => {
                    return (
                        <div key={key} className="col-lg-12 my-3 mx-auto" style={{ width: '600px' }}>
                            <Card style={{padding: '2.5%', borderRadius: '15px', boxShadow: '0 0 20px gold', marginBottom: '50px'}}>
                                <Card.Header style={{borderRadius: '15px',boxShadow: '0 0 10px grey' }}>
                                    <img
                                        className='mr-2'
                                        width='50'
                                        height='50'
                                        style={{borderRadius: '50%', marginRight: '1%'}}
                                        src={post.author.avatar}
                                    />
                                    <small className="ms-2 me-auto d-inline">
                                        {post.author.username}
                                    </small>
                                    <small style={{marginLeft: '10px'}}>
                                        {
                                            (()=> {
                                                switch (post.author.guild) {
                                                case 'Elf': return (<span style={{backgroundColor: 'aqua', color: 'black', padding: '1%', borderRadius: '20%'}}>Elf</span>);
                                                case 'Orc': return (<span style={{backgroundColor: 'green', color: 'white', padding: '1%', borderRadius: '20%'}}>Orc</span>);
                                                case 'Vamp': return (<span style={{backgroundColor: 'red', color: 'white', padding: '1%', borderRadius: '20%'}}>Vamp</span>);
                                                case 'Nord': return (<span style={{backgroundColor: 'gold', color: 'black', padding: '1%', borderRadius: '20%'}}>Nord</span>);
                                                }
                                            })()
                                        }
                                    </small>
                                    <small className="mt-1 float-end d-inline" style={{fontWeight: 'bold', opacity: '0.6'}}>
                                        {post.author.address}
                                    </small>
                                </Card.Header>
                                <Card.Body color="grey" style={{backgroundColor: '#171717', borderRadius: '15px', boxShadow: '0 0 5px gold', marginBottom: '20px', marginTop: '15px'}}>
                                    <Card.Title >
                                        <div style={{color: 'whitesmoke'}}>
                                            {post.content}
                                        </div>
                                        
                                    </Card.Title>
                                </Card.Body>
                                <Card.Footer className="list-group-item">
                                    <div className="d-inline mt-auto float-start" style={{paddingLeft: '2%', opacity: '0.6'}}>Tip Amount: {ethers.utils.formatEther(post.tipAmount)} ETH</div>
                                    {address === post.author.address || !hasProfile ?
                                        null : <div className="d-inline float-end">
                                            <Button onClick={() => tip(post)} variant="dark" size="md" style={{padding: '10px', borderRadius: '15px'}}>
                                                Tip
                                            </Button>
                                        </div>}
                                </Card.Footer>
                            </Card>
                        </div>)
                })
                : (
                    <div className="text-center">
                        <main style={{ padding: "1rem 0" }}>
                            <h2 style={{color: "whitesmoke"}}>No posts yet</h2>
                        </main>
                    </div>
                )}

        </div >
    );
}

export default Home