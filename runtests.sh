# Run Unit / Integration Tests plus coverage

# Clear out previous coverage reports
rm -rf coverage/

# Run jshint for static code analysis
jshint **/*.js
jshintResult=$?

# Run tests and generate coverage
istanbul cover -x 'integration/**/*' ./node_modules/mocha/bin/_mocha -- -c -R spec test integration
testingResult=$?

# Build Clover Report for CI/CD plugin
istanbul report clover

# Confirm 100% Coverage Acheived
istanbul check-coverage --statement 100 --branch 100 --function 100 --line 100
coverageResult=$?

if [ $jshintResult -ne 0 ]; then echo $'\n'$'\e[31m''  JSHint Errors:'$'\n'; exit 1; fi
if [ $testingResult -ne 0 ]; then echo $'\n'$'\e[31m'"  Unit / Integration Test Errors:"$'\n'; exit 1; fi

# Open Chrome to Coverage Report if under 100%
if [ $coverageResult -ne 0 ]; then
    open -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome ./coverage/lcov-report/index.html
else
    echo $'\n'"  100% Coverage! Woohoo!"$'\n'
fi
