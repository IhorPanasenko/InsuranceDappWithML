import Web3 from "web3";

const providerUrl = "http://127.0.0.1:7545";
const contractAddress = "0xFd6A59AC4F2008Bea226eE88C82e31785AC78C18";
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

const contractAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "policyId",
        type: "string",
      },
    ],
    name: "InsuranceActivated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "policyId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
    ],
    name: "InsuranceCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "policyId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "payer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "InsurancePaid",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "policyId",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "userAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "ReservedFundsWithdrawn",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_policyId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_category",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_coverageAmount",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_providerCompany",
        type: "string",
      },
    ],
    name: "createInsurance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "policyId",
        type: "string",
      },
    ],
    name: "payForInsurance",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_policyId",
        type: "string",
      },
    ],
    name: "companyPayInsurance",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "policyId",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "withdrawAmount",
        type: "uint256",
      },
    ],
    name: "withdrawReservedAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getUserInsuranceCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "policyId",
        type: "string",
      },
    ],
    name: "getUserInsuranceDetails",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getUserInsurances",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "policyId",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "category",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "coverageAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "reservedAmount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "providerCompany",
            type: "string",
          },
          {
            internalType: "bool",
            name: "userPaid",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "companyPaid",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
        ],
        internalType: "struct InsuranceContract.Insurance[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "policyId",
        type: "string",
      },
    ],
    name: "getReservedAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

const userInsuranceContract = new web3.eth.Contract(
  contractAbi,
  contractAddress
);

export { web3, userInsuranceContract };
