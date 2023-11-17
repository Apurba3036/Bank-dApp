var web3;

const address="0x9C29f99BA9E48AF875Cc5c42F94dB3c9d47cE53a";

async function Connect() {
    try {
        await window.ethereum.enable();
        web3 = new Web3(window.ethereum);

        if (window.ethereum) {
 
            await window.ethereum.request({ method: "eth_requestAccounts" });
            // window.web3 = new Web3(window.ethereum);
            
           } else {
            console.log("No wallet");
           }
    } catch (error) {
        console.error(error);
       // document.getElementById("status").innerHTML = "Please connect MetaMask";
    }
}


if (typeof web3 === "undefined") {
    document.getElementById("status").innerHTML = "Please connect MetaMask";
} else {
    web3 = new Web3(window.ethereum);
    
}


const abi=[
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "amt",
				"type": "int256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "int256",
				"name": "amt",
				"type": "int256"
			}
		],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getbalance",
		"outputs": [
			{
				"internalType": "int256",
				"name": "",
				"type": "int256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

 var contract=new web3.eth.Contract(abi,address);

function depositamount(){

    var input= document.getElementById("amount").value;
    web3.eth.getAccounts().then(function(account){
    return contract.methods.deposit(input).send({from:account[0]});
    }).then(function(tmp){
        $("#amount").val("");
        show_bal();
    }).catch(function(tmp){

        alert(tmp);
    })


}


function withdrawamount(){

    var input= document.getElementById("amount").value;
    web3.eth.getAccounts().then(function(account){
    return contract.methods.withdraw(input).send({from:account[0]});
    }).then(function(tmp){
        $("#amount").val("");
        show_bal();
    }).catch(function(tmp){

        alert(tmp);
    })

}



function show_bal(){

    contract.methods.getbalance().call().then(function(balance){

            $("#balance").html(balance);
    })
}