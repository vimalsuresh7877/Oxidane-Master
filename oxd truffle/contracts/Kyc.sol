pragma solidity ^0.5.0;

contract Kyc{
    struct regcustomer{
      string name;
      address acountno;
      uint adharno;
     }
    
   mapping(address=>regcustomer)public registration;
   mapping(uint=>address)public adharverify;
  mapping(string=>uint) public Exchange;
   event customerreg(string _name,uint _adharno,address customer);
    function signup(string memory _name,uint _adharno)public
        {
    
            registration[msg.sender].name=_name;
           
            registration[msg.sender].adharno=_adharno;
           
            registration[msg.sender].acountno=msg.sender;
            
        }

        function registerExchange(string memory _exchangeaddr) public
        {
          
          Exchange[_exchangeaddr]=1;
        }

}