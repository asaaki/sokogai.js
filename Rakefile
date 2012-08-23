# encoding: utf-8

SRC_PATH    = File.realpath(File.join(File.dirname(__FILE__),'src'))
BUILD_PATH  = File.realpath(File.join(File.dirname(__FILE__),'.'))
GEN_PACKAGE = %w[ storage mstorage ]

JS_PACKAGE  = { :name => "sokogai",        :files => %w[ sokogai ] }
JQ_PACKAGE  = { :name => "jquery.sokogai", :files => %w[ sokogai jquery.sokogai ] }

module Merger
  extend self

  def run! package
    merge_package = GEN_PACKAGE + package[:files]
    merged = merge_package.inject('') do |out, file|
      f = File.read("#{SRC_PATH}/#{file}.js")
      out << f << ";\n"
    end
    File.open("#{BUILD_PATH}/#{package[:name]}.js","w+") do |fh|
      fh.write merged
    end
  end

end

module Compiler
  extend self

  def run!
    files = Dir[BUILD_PATH+'/*.js'].reject{|f| f =~ /\.min\.js\Z/}
    puts files
    files.each do |file|
      input_file  = "--js #{file}"
      output_file = " --js_output_file #{file.sub(/\.js\Z/,'.min.js')}"
      cmd = ["java", "-jar vendor/compiler.jar", input_file, output_file].join(' ')
      puts "COMPILE:\n -> #{cmd}"
      system cmd
    end
  end

end

namespace :merge do

  desc "Merge files for standalone Javascript usage"
  task :js do
    Merger.run! JS_PACKAGE
  end

  desc "Merge files for jQuery plugin usage"
  task :jquery do
    Merger.run! JQ_PACKAGE
  end

  desc "Merge files for standalone JS and jQuery plugin"
  task :all => ["merge:js","merge:jquery"]

end

desc "Compile/minify merged files"
task :compile do
  Compiler.run!
end

desc "Clean up files"
task :clean do
  files = Dir[BUILD_PATH+'/*.js'].join(" ")
  system "rm #{files}" unless files.empty?
end

namespace :build do

  desc "Build for standalone Javascript usage"
  task :js => ["merge:js", :compile]

  desc "Build for jQuery plugin usage"
  task :jquery => ["merge:jquery", :compile]

  desc "Build all and everything (merge and compile)"
  task :all => [:clean, "build:js","build:jquery"]

end

desc "Build all and everything (merge and compile)"
task :build => ["build:js","build:jquery"]
