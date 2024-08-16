contract c {
  function c()
  {
      val1 = 1 wei;    // 1
      val2 = 1 szabo;  // 1 * 10 ** 12
      val3 = 1 finney; // 1 * 10 ** 15
      val4 = 1 ether;  // 1 * 10 ** 18
 }
  uint256 val1;
  uint256 val2;
  uint256 val3;
  uint256 val4;
}

contract test {
  function f(uint x, uint y) returns (uint z) {
    var c = x + 3;
    var b = 7 + (c * (8 - 7)) - x;
    return -(-b | 0);
  }
}

contract c {
  function () { return g(8); }
  function g(uint pos) internal returns (uint) { setData(pos, 8); return getData(pos); }
  function setData(uint pos, uint value) internal { data[pos] = value; }
  function getData(uint pos) internal { return data[pos]; }
  mapping(uint => uint) data;
}

contract Sharer {
    function sendHalf(address addr) returns (uint balance) {
        if (!addr.send(msg.value/2))
            throw; // also reverts the transfer to Sharer
        return address(this).balance;
    }
}

/// @dev Models a modifiable and iterable set of uint values.
library IntegerSet
{
  struct data
  {
    /// Mapping item => index (or zero if not present)
    mapping(uint => uint) index;
    /// Items by index (index 0 is invalid), items with index[item] == 0 are invalid.
    uint[] items;
    /// Number of stored items.
    uint size;
  }
  function insert(data storage self, uint value) returns (bool alreadyPresent)
  {
    uint index = self.index[value];
    if (index > 0)
      return true;
    else
    {
      if (self.items.length == 0) self.items.length = 1;
      index = self.items.length++;
      self.items[index] = value;
      self.index[value] = index;
      self.size++;
      return false;
    }
  }
  function remove(data storage self, uint value) returns (bool success)
  {
    uint index = self.index[value];
    if (index == 0)
      return false;
    delete self.index[value];
    delete self.items[index];
    self.size --;
  }
  function contains(data storage self, uint value) returns (bool)
  {
    return self.index[value] > 0;
  }
  function iterate_start(data storage self) returns (uint index)
  {
    return iterate_advance(self, 0);
  }
  function iterate_valid(data storage self, uint index) returns (bool)
  {
    return index < self.items.length;
  }
  function iterate_advance(data storage self, uint index) returns (uint r_index)
  {
    index++;
    while (iterate_valid(self, index) && self.index[self.items[index]] == index)
      index++;
    return index;
  }
  function iterate_get(data storage self, uint index) returns (uint value)
  {
      return self.items[index];
  }
}

/// How to use it:
contract User
{
  /// Just a struct holding our data.
  IntegerSet.data data;
  /// Insert something
  function insert(uint v) returns (uint size)
  {
    /// Sends \`data\` via reference, so IntegerSet can modify it.
    IntegerSet.insert(data, v);
    /// We can access members of the struct - but we should take care not to mess with them.
    return data.size;
  }
  /// Computes the sum of all stored data.
  function sum() returns (uint s)
  {
    for (var i = IntegerSet.iterate_start(data); IntegerSet.iterate_valid(data, i); i = IntegerSet.iterate_advance(data, i))
      s += IntegerSet.iterate_get(data, i);
  }
}

contract FromSolparse is A, B, TestPrivate, TestInternal {
  function() {
    uint a = 6 ** 9;
    var (x) = 100;
    uint y = 2 days;
  }
}

contract CommentedOutFunction {
  // FYI: This empty function, as well as the commented
  // out function below (bad code) is important to this test.
  function() {

  }

  // function something()
  //  uint x = 10;
  // }
}

contract assemblyReturn {
  uint a = 10;

  function get() constant returns(uint) {
    assembly {
        mstore(0x40, sload(0))
        byte(0)
        address(0)
        return(0x40,32)
    }
  }
}

contract VariableDeclarationTuple {
  function getMyTuple() returns (bool, bool){
    return (true, false);
  }

  function ham (){
    var (x, y) = (10, 20);
    var (a, b) = getMyTuple();
    var (,c) = (10, 20);
    var (d,,) = (10, 20, 30);
    var (,e,,f,) = (10, 20, 30, 40, 50);

    var (
      num1, num2,
      num3, ,num5
    ) = (10, 20, 30, 40, 50);
  }
}

contract Ballot {

    struct Voter {
        uint weight;
        bool voted;
    }

    function abstain() returns (bool) {
      return false;
    }

    function foobar() payable owner (myPrice) returns (uint[], address myAdd, string[] names) {}
    function foobar() payable owner (myPrice) returns (uint[], address myAdd, string[] names);

    Voter you = Voter(1, true);

    Voter me = Voter({
        weight: 2,
        voted: abstain()
    });

    Voter airbnb = Voter({
      weight: 2,
      voted: true
    });
}