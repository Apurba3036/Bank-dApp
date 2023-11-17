// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.20;

contract Bank{

        int bal;

        constructor(){

            bal=1;
        }

        function getbalance() view public returns(int){

            return bal;
        }

        function  withdraw(int amt) payable  public{
             
             bal=bal-amt;

        }

        function  deposit(int amt) payable  public{

            bal=bal+amt;
        }

}