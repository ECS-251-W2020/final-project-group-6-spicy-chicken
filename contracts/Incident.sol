pragma solidity >=0.4.18;

contract Incident{

    mapping(int => badcase) accidents;
    struct badcase {
        string id;
        string latitude;
        string longtide;
        string speed;
        string heading;
        string timestamp;
        bool verified;
    }

    int public i;
    function setAccident(
    	string memory _id,
    	string memory _lati,
    	string memory _longi,
    	string memory _speed,
	string memory _heading, 
    	string memory _timestamp,
    	bool _verified) public {

        i+=1;
        accidents[i].id        =  _id;
        accidents[i].latitude  =  _lati;
        accidents[i].longtide  =  _longi;
        accidents[i].speed     =  _speed;
        accidents[i].heading   =  _heading;
        accidents[i].timestamp =  _timestamp;
        accidents[i].verified  =  _verified;
    }

    function getAccident(int  i) view public returns (
	string memory _id,
     	string memory _lati,
     	string memory _longi,
     	string memory _speed,
	string memory _heading,
	string memory _timestamp,
    	bool _verified) {

	return (
		accidents[i].id,
         	accidents[i].latitude,
         	accidents[i].longtide,
         	accidents[i].speed,
         	accidents[i].heading,
         	accidents[i].timestamp,
         	accidents[i].verified);
   }
}
