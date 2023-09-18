# DTavern
![Project (2)](https://github.com/Sidkjr/DTavern/assets/40859683/3f9807f2-d169-4297-8d71-cf0089c5633e)


## Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (React & Testing)
- [Ethers](https://docs.ethers.io/v5/) (Blockchain Interaction)
- [Hardhat](https://hardhat.org/) (Development Framework)
- [Ipfs - Infura](https://www.infura.io/product/ipfs) (Metadata storage)
- [React routers](https://v5.reactrouter.com/) (Navigational components)

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/), should work with any node version below 16.5.0
- Install [Hardhat](https://hardhat.org/)

## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies:
```
$ cd DTavern
$ npm install
```
### 3. Boot up local development blockchain
```
$ cd DTavern
$ npx hardhat node
```

### 4. Connect development blockchain accounts to Metamask
- Copy private key of the addresses and import to Metamask
- Connect your metamask to hardhat blockchain, network 127.0.0.1:8545.
- If you have not added hardhat to the list of networks on your metamask, open up a browser, click the fox icon, then click the top center dropdown button that lists all the available networks then click add networks. A form should pop up. For the "Network Name" field enter "Hardhat". For the "New RPC URL" field enter "http://127.0.0.1:8545". For the chain ID enter "31337". Then click save.  


### 5. Run deploy script to migrate smart contracts
`$ npx hardhat run scripts/deploy.js --network localhost`

### 6. Run Tests
`$ npx hardhat test`

### 7. Launch Frontend
`$ npm run start`

## Screenshots
![Screenshot from 2023-09-18 09-39-08](https://github.com/Sidkjr/DTavern/assets/40859683/cd9faf38-0962-46c6-ab61-124e03bc337d)
![Screenshot from 2023-09-18 09-41-00](https://github.com/Sidkjr/DTavern/assets/40859683/54ae1eeb-73ba-4b7b-9ae7-418690049ce0)
![Screenshot from 2023-09-18 09-42-46](https://github.com/Sidkjr/DTavern/assets/40859683/4e3c1f17-2b2d-41df-ab7f-44950fcbea49)
![Screenshot from 2023-09-18 09-43-12](https://github.com/Sidkjr/DTavern/assets/40859683/4c55f12f-0d46-4638-b15c-a7f834bc51b4)
![Screenshot from 2023-09-18 09-43-46](https://github.com/Sidkjr/DTavern/assets/40859683/b6dd9a92-fecd-4da0-aebb-a3ed15e6e992)
![Screenshot from 2023-09-18 09-44-29](https://github.com/Sidkjr/DTavern/assets/40859683/c01186e8-9f43-444c-b993-4acf7225a5f1)
![Screenshot from 2023-09-18 09-45-07](https://github.com/Sidkjr/DTavern/assets/40859683/925e6942-09ff-4b87-af41-41cc577f39ba)
![Screenshot from 2023-09-18 09-45-25](https://github.com/Sidkjr/DTavern/assets/40859683/a4192780-a52d-46ab-9b65-434ad01dbfe2)
![Screenshot from 2023-09-18 09-45-40](https://github.com/Sidkjr/DTavern/assets/40859683/8956ab83-4fbf-4f0b-b635-068a1121e702)
![Screenshot from 2023-09-18 09-45-59](https://github.com/Sidkjr/DTavern/assets/40859683/7af7c7b5-724c-474b-8a19-dac4f66b88ef)
![Screenshot from 2023-09-18 09-46-48](https://github.com/Sidkjr/DTavern/assets/40859683/8d95c572-b4a8-46a3-9c6f-d59d4bbd1404)
![Screenshot from 2023-09-18 09-47-32](https://github.com/Sidkjr/DTavern/assets/40859683/3263a9de-e800-4814-a6ae-4c5dfaf9f7b2)
![Screenshot from 2023-09-18 09-49-15](https://github.com/Sidkjr/DTavern/assets/40859683/dcd7cddf-25c7-4cc3-b300-d086e5fbd977)
![Screenshot from 2023-09-18 09-49-37](https://github.com/Sidkjr/DTavern/assets/40859683/5fd594fc-b35f-42b6-b020-47f58baaa387)
![Screenshot from 2023-09-18 09-49-58](https://github.com/Sidkjr/DTavern/assets/40859683/2a046123-648b-437f-9afb-310bfd04bc8d)
![Screenshot from 2023-09-18 09-56-18](https://github.com/Sidkjr/DTavern/assets/40859683/5e8aab6f-89ec-44e6-894e-e629558751d6)
![Screenshot from 2023-09-18 09-59-29](https://github.com/Sidkjr/DTavern/assets/40859683/698a69dd-623e-448f-ac1b-f60e1d129177)
![Screenshot from 2023-09-18 09-59-44](https://github.com/Sidkjr/DTavern/assets/40859683/b96b4aee-d190-41d5-b06c-23222a5488b1)
![Screenshot from 2023-09-18 10-00-10](https://github.com/Sidkjr/DTavern/assets/40859683/fa860645-726f-4d51-b16f-ba7af5703ba0)
![Screenshot from 2023-09-18 10-00-22](https://github.com/Sidkjr/DTavern/assets/40859683/630293fe-f47c-4936-80ca-7e884d405c82)


License
----
MIT

