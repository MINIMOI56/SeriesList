export default class User {
    id: String;
    username: string;
    profile_picture
    email: string;
    password: string;
    media_id: [string];
    created_at: Date;

    constructor(data: any) {
        this.id = data._id;
        this.username = data.username;
        this.profile_picture = data.profile_picture;
        this.email = data.email;
        this.password = data.password;
        this.media_id = data.media_id;
        this.created_at = data.created_at;
    }
}