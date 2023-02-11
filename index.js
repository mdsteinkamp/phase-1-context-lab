const matt = ['Matt', 'Steinkamp', 'CEO', 100]
const eric = ['Eric', 'Bernstein', 'CFO', 90]
// const jaime = ['Jaime', 'Lerman', 'COO', 90]
// const ryan = ['Ryan', 'Laffly', 'CTO', 80]
// const julius = ["Julius", "Caesar", "General", 27]
// const emp6 = ['Eric', 'fake', 'loser', 1]


const empArr = [matt, eric]

const theGang = createEmployeeRecords(empArr)
mattObj = theGang[0]
ericObj = theGang[1]


///below for version w context
// const mattObj= createEmployeeRecord.call(matt)
// const ericObj = createEmployeeRecord.call(eric)
// const empArr = [mattObj, ericObj]

//version1
function createEmployeeRecord(employeeArr) {
    let employeeObj = {firstName: employeeArr[0], familyName: employeeArr[1], title: employeeArr[2], payPerHour: employeeArr[3], timeInEvents: [],  timeOutEvents: [],
    };
    return employeeObj;
};


///version1 
function createEmployeeRecords(employeeArr) {
    return employeeArr.map(emp => createEmployeeRecord(emp))
};

// function createEmployeeRecords(employeeArr) {
//     return employeeArr.map(createEmployeeRecord)
// };



function createTimeInEvent (dateStamp) {
    // let empObj = createEmployeeRecord(employeeObj)
    // console.log(empObj)
    let timeInObj = {
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(11, 15),10),
        date: dateStamp.slice(0,10),
    }
    this.timeInEvents.push(timeInObj);
    return this;
};

function createTimeOutEvent (dateStamp) {
    // let empObj = createEmployeeRecord(employeeObj)
    // console.log(empObj)
    let timeOutObj = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(11, 15),10),
        date: dateStamp.slice(0,10),
    }
    this.timeOutEvents.push(timeOutObj);
    return this;
};

function hoursWorkedOnDate(date) {
    const workDateStart = this.timeInEvents.filter(entry => entry.date === date)
    const workDateEnd = this.timeOutEvents.filter(entry => entry.date === date)
    return (workDateEnd[0].hour - workDateStart[0].hour) / 100;

};

function wagesEarnedOnDate(date) {
    const hours = hoursWorkedOnDate.call(this, date) * this.payPerHour;
    // console.log(typeof hours)
    return hours
};

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function allWagesFor () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(collection, firstNameString){
    return collection.find(emp => emp.firstName === firstNameString)
}

// function calculatePayroll(employeeArr) {
//     let grandTotalOwed = employeeArr.reduce((accum, emp) => accum + allWagesFor.call(this), 0)
//     return grandTotalOwed;
// };

function calculatePayroll (employeeArr) {
    const grandTotalOwed = employeeArr.reduce((accum, emp) =>  accum + allWagesFor.call(emp), 0);
    console.log(grandTotalOwed, "Grand total")
    // return grandTotalOwed
};


// function calculatePayroll(employeeArr) {
//     const grandTotalOwed = employeeArr.reduce(function (accum, emp) {
//         console.log(this)
//          return accum + allWagesFor.call(this, emp)
//      }, 0)
//     return grandTotalOwed;
// };

// const calculatePayroll = function (employeeArr) {
//     return grandTotalOwed = employeeArr.reduce((accum, emp) =>  accum + allWagesFor.call(emp), 0);
//     // return grandTotalOwed;
// };

//version1
// function createEmployeeRecord(employeeArr) {
//     let employeeObj = {
//         firstName: employeeArr[0],
//         familyName: employeeArr[1],
//         title: employeeArr[2],
//         payPerHour: employeeArr[3],
//         timeInEvents: [],
//         timeOutEvents: [],
//     };
//     return employeeObj;
// };

// version2 w context
// function createEmployeeRecord(employeeArr) {
//     let employeeObj = {
//         firstName: this[0],
//         familyName: this[1],
//         title: this[2],
//         payPerHour: this[3],
//         timeInEvents: [],
//         timeOutEvents: [],
//     };
//     return employeeObj;
// };


///version1 
// function createEmployeeRecords(employeeArr) {
//     return employeeArr.map(createEmployeeRecord)
// };

///version2
// function createEmployeeRecords(employeeArr) {
//     return employeeArr.map((emp) => emp)
// };

///version1
// function findEmployeeByFirstName (empArr, firstName) {
//     return empArr.filter(employee => employee.firstName === firstName)
// };