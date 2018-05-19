/**
 * Criamos um modulo para exportar
 * Nesse caso, criamos uma funcao que contem outra funcao
 */
module.exports = (x) => {
    const par = () => {
        return x % 2 === 0 ? true : false;
    };
    
    return {
        msg: "O valor eh par?",
        valor: par()
    }
}