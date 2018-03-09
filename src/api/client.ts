import axios, { AxiosResponse } from "axios";



function deserializeResponse<T>(response: AxiosResponse<any>): T {
    return JSON.parse(response.data as string) as T;
}

export class ApiClient {

    apiURL: string = "https://oguemon.com/owarai-map/api.php";

    /**
     * つっこみのデータの一覧を取得
    */
    async fetchList(lat: number, long: number): Promise<FetchListResponse> {
        const params = new URLSearchParams();
        params.append("req", "fetch_list");
        params.append("lat", String(lat));
        params.append("long", String(long));

        const res = await axios.post(this.apiURL, params);

        return res.data;
    }

    /**
     * つっこみの詳細情報を取得
     */
    async fetchTukkomiDetail(tukkomiId: string): Promise<TukkomiDetail> {
        const params = new URLSearchParams();
        params.append("req", "tukkomi");
        params.append("tukkomi_id", tukkomiId);

        const res = await axios.post(this.apiURL, params);

        return res.data;
    }

    /**
     * 同一のスポットを取得する (現在地から近い順)
     * @param latitude スポットの緯度
     * @param longitude スポットの経度
     */
    async fetchSameSpot(latitude: number, longitude: number): Promise<FetchSameReponse> {
        const params = new URLSearchParams();
        params.append("req", "fetch_same");
        params.append("lat", String(latitude));
        params.append("long", String(longitude));
        const res = await axios.post(this.apiURL, params);

        return res.data;
    }

    /**
     * つっこみを追加する
     * @param spotLat スポットの緯度
     * @param spotLong スポットの経度
     * @param spotImg スポットの画像
     * @param spotImgId スポットの既存画像 (spotImg, spotImgId のいずれかが空値)
     */
    async addTukkomi(
        spotId: number | null,
        spotLat: number,
        spotLong: number,
        spotImg: string, // Base64文字列
        spotImgId: string,
        tukkomiWord: string,
        userId: number
    ): Promise<boolean> {

        const params = new URLSearchParams();
        params.append("req", "add_tukkomi");
        params.append("spot_id", String(spotId));
        params.append("spot_lat", String(spotLat));
        params.append("spot_long", String(spotLong));
        params.append("img", spotImg);
        params.append("img_id", spotImgId);
        params.append("tukkomi_word", tukkomiWord);
        params.append("user_id", String(userId));
        const res = await axios.post(this.apiURL, params);

        return true;
    }
}

type FetchListResponse = Array<TukkomiItemResponse>;
interface TukkomiItemResponse {
    /**
     * つっこみの内容
     */
    content: string;

    /**
     * つっこみの画像
     */
    photoId: string;

    /**
     * つっこみのID
     */

    id: number;

    /**
     * 緯度 -90 ~ 90
     */
    latitude: number;

    /**
     * 経度 -180 ~ 180
     */
    longitude: number;

    /**
     * いいねされた数
     */
    likes: number;
}

interface TukkomiDetail {
    /**
     * つっこみの内容
     */
    content: string;

    /**
     * つっこみの画像
     */
    photoId: string;

    /**
     * Like数
     */
    like: number;

    /**
     * ユーザー名
     */
    name: string;

    /**
     * ユーザーの画像
     */
    img: string;

    /**
     * ユーザーの自己紹介
     */
    bio: string;
}


type FetchSameReponse = Array<DuplicatedSpot>;
interface DuplicatedSpot {
    /**
     * つっこみの画像
     */
    tukkomi_image: string;

    /**
     * つっこみの ID
     */
    tukkomi_id: number;

    /**
     * スポットの ID
     */
    spot_id: number;
}