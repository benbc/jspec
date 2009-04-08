
describe 'Grammar'

  it 'should allow "it" spec literal'
    true.should.be_true
  end
  
  n = 10
  it 'should allow literal javascript outside of blocks'
    n.should.eql 10
  end
  
  it 'should allow parens to be optional when no args are passed'
    true.should.be_true
    true.should.be_true()
  end
  
  it 'should allow parens to be optional with args'
    'foobar'.should.include 'foo'
    'rawr'.should.not_include 'foo'
  end
  
  it 'should allow literals without defining variables variables'
    {}.should.be_an Object
  end
  
  it 'should allow alternative closure literal'
    -{ throw 'test' }.should.throw_error
  end
  
  it 'should allow . this. literal'
    this.foo = 'bar'
    .foo.should.eql 'bar'
  end
  
  it 'should allow inclusive range literal n..n'
    1..5.should.eql [1,2,3,4,5]
    3..4.should.eql [3,4]
    1..1.should.eql [1]
    3..1.should.eql [3,2,1]
  end
  
  it 'should allow snakecase style assertions'
    'foo'.should_equal('foo')
    'foo'.should_equal 'foo'
    'bar'.should_not_equal('foo')
    'bar'.should_not_equal 'foo'
  end
  
  it 'should allow dot style assertions'
    'foo'.should.equal('foo')
    'foo'.should.equal 'foo'
    'bar'.should.not.equal('foo')
    'bar'.should.not.equal 'foo'
  end
  
  describe 'with nested describe'
    it 'should work'
      true.should.be_true
    end
    
    it 'should still allow literal javascript outside of blocks'
      n.should.eql 10
    end
    
    describe 'nested again'
      it 'should still work'
        true.should.be_true
      end
    end
  end
  
  describe 'before / after blocks'
    var n, o
    
    before
      n = 1
    end
    
    after 
      n = 0
    end
    
    it 'should work'
      n.should.eql 1
      n++
    end
    
    it 'should persist'
      n.should.eql 2
    end
    
    describe 'with nested describe'
      it 'should be accessable'
        n.should.eql 0
      end
    end
  end
  
  describe 'before_each / after_each blocks'
    before_each
      n = 1
    end
    
    after_each
      o = 2
    end
    
    it 'should work'
      n.should.eql 1
      n = 2
    end
    
    it 'should not persist'
      n.should.eql 1
      o.should.eql 2
    end
    
    describe 'with nested describe'
      it 'should be accessable'
        n.should.eql 1
        o.should.eql 2
      end
    end
  end
  
end