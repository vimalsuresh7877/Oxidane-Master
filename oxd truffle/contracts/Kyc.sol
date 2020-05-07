pragma solidity ^0.5.0;

contract Kyc{
    struct regcustomer{
      string name;
      address acountno;
      uint adharno;
     }
    
   mapping(address=>regcustomer)public registration;
   mapping(uint=>address)public adharverify;
   event customerreg(string _name,uint _adharno,address customer);
    function signup(string memory _name,uint _adharno)public
        {
    
            registration[msg.sender].name=_name;
           
            registration[msg.sender].adharno=_adharno;
           
            registration[msg.sender].acountno=msg.sender;
            emit customerreg(_name,_adharno,msg.sender);
        }

}