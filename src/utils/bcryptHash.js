
module.exports = function BcryptHash(bcrypt){
    return {
        compare: (myPlaintextPassword, hash) => {
            return bcrypt.compareSync(myPlaintextPassword, hash);
        },
        hashPass: (myPlaintextPassword, saltRounds) => {
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(myPlaintextPassword, salt);
            return hash;
        },
        compareAsync: (myPlaintextPassword, hash) => {
            return bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
                console.log({err, result})
                // result == true
                if(err) console.log("error: ",err)
                return result;
            });
        },
        hashPass2: (myPlaintextPassword, saltRounds) => {
            const hash = bcrypt.hash(myPlaintextPassword, saltRounds)
            return hash;
            // return bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
            //     console.log({err, hash})
            //     if(err) console.log("error: ",err)
            //     return hash;
            // });
        }
    }

}

// module.exports = {
//     compare: (myPlaintextPassword, hash) => {
//             console.log({myPlaintextPassword, hash})
//             return bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
//                 // result == true
//                 if(err) console.log("error: ",err)
//                 return result;
//             });
//     },
//     hashPass: (myPlaintextPassword, saltRounds) => {
//             var salt = bcrypt.genSaltSync(10);
//             var hash = bcrypt.hashSync(myPlaintextPassword, salt);
//             return hash;
//     }

// }