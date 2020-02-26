pragma solidity ^0.6.3;

contract Answer {
  mapping(address => mapping(string => bool)) voters;

  struct qList {
    uint count; /* The number of respondents */
    mapping(address => mapping(uint => uint)) answer;
  }

  mapping(string => qList) questionnaires;

  function vote(string memory ID, uint qNum, uint ans) public returns (bool) {
    assert(voters[msg.sender][ID]) ;
    voters[msg.sender][ID] = true;
    questionnaires[ID].count += 1;
    questionnaires[ID].answer[msg.sender][qNum] = ans;
    return true;
  }

  function getNumResult(string memory ID) view public returns (uint res) {
    return questionnaires[ID].count;
  }
}
