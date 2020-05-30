pragma solidity ^0.5.0;

contract Kyc{
    struct regcustomer{
      string name;
      address acountno;
      uint adharno;
     }
    uint public exchangecount=0;
   mapping(address=>regcustomer)public registration;
   mapping(uint=>address)public adharverify;
  mapping(address=>uint) public exchangereg;
  mapping(uint=>address) public exchange;

   event customerreg(string _name,uint _adharno,address customer);
    function signup(string memory _name,uint _adharno)public
        {
    
            registration[msg.sender].name=_name;
           
            registration[msg.sender].adharno=_adharno;
           
            registration[msg.sender].acountno=msg.sender;
            
        }

        function registerExchange(address _exchangeaddr) public
        {
         exchangecount++ ;
          exchange[exchangecount]=_exchangeaddr;
          exchangereg[_exchangeaddr]=1;
        }

}