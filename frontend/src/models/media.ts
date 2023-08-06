export default class Media {
    _id: string;
    title: string;
    description: string;
    image_url: string;
    seasons: number;
    episodes: number;
    avrg_episode_time: number;
    status: string;
    type: string;
    rating: string;
    start_date: Date;
    end_date: Date | undefined;
    score: number;
    comments: any[];
    personal_status: string;

    constructor(data: any) {
        this._id = data._id;
        this.title = data.title;
        this.description = data.description;
        this.image_url = data.image_url;
        this.seasons = data.seasons;
        this.episodes = data.episodes;
        this.avrg_episode_time = data.avrg_episode_time;
        this.status = data.status;
        this.type = data.type;
        this.rating = data.rating;
        this.start_date = data.start_date;
        this.end_date = data.end_date;
        this.score = data.score;       
        this.comments = data.comments;
        this.personal_status = data.personal_status; 
    }
}