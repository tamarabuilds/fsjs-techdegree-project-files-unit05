const order = false;

const breakfastPromise = new Promise ( (resolve, reject) => {
    setTimeout( () => {
        if (order){
            resolve(`Your order is read, come and get it!`);
        }
        reject(Error(`Your orrder cannot be made`));
    }, 3000);
});

console.log(breakfastPromise)
breakfastPromise
    .then( val => console.log(val) )
    .catch( err => console.log(err));