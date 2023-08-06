export default class Comment {
    _id: string;
    user_id: string;
    media_id: string;
    comment: string;
    created_at: Date;
    modified: boolean;

    constructor(data: any) {
        this._id = data._id;
        this.user_id = data.user_id;
        this.media_id = data.media_id;
        this.comment = data.comment;   
        this.created_at = data.created_at;  
        this.modified = data.modified;
    }
}