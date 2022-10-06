module.exports = function GetStrings({crypto}, logger){
    function capitalize(str){
        console.log({str})
        return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1);
    }

    function generateSlug(name){
        const splitname = name.split(" ");
        if(splitname.length < 2){//means there is no spacing
            return name.toLowerCase();
        }
        return splitname.join("-").toLowerCase();;
    }

    function generateRand(max = 5){
        const result = crypto.randomBytes(max).toString("hex");
        return result;
    }
    

    return Object.freeze({
        capitalize,
        generateSlug,
        generateRand
    });
}