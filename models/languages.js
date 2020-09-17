const db = require("./conn")

class LanguagesList {
    constructor (name, rank_id, rank_text, rank_num){
        this.name = name;
        this.rank_id = rank_id
        this.rank_text = rank_text
        this.rank_num = rank_num
    }
    static async getAll () {
        try {
            const response = await db.any(`SELECT * FROM languages INNER JOIN rankings ON rankings.rank_id = languages.my_rank ORDER BY languages.id;`);
            return response;
        }catch (error){
            return error.message;
        }
    }
    static async updateStatus(rank, name){
        try {
            const response = await db.result(`UPDATE languages SET my_rank = $1 WHERE name = $2`, [rank, name]);
            return response;
        }catch (error){
            console.error("Error: ", error)
            return error.message
        }
    }
}
module.exports = LanguagesList;