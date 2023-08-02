export default class User {
    id: String;
    username: string;
    first_name: string;
    last_name: string; 
    email: string;
    password: string;
    media_id: [string];
    created_at: Date;

    constructor(data: any) {
        this.id = data._id;
        this.username = data.username;
        this.first_name = data.first_name;
        this.last_name = data.last_name;
        this.email = data.email;
        this.password = data.password;
        this.media_id = data.media_id;
        this.created_at = data.created_at;
    }

    getFullName() {
        return this.first_name + ' ' + this.last_name;
    }
}