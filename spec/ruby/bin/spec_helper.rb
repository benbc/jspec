
require 'fileutils'

load File.dirname(__FILE__) + '/../../../bin/jspec'

def jspec name, *args
  #command(name).run *args
  `jspec #{name.to_s} #{args.join(' ')}`
end

def capture &block
  IO.popen('-') do |io|
    io ? io.read : yield
  end
end

def shell *args
  IO.popen(JSPEC_ROOT + '/bin/jspec shell', 'r+') do |io|
    args.each do |arg|
      io.puts arg
    end
    io.read
  end
end
