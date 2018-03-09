import axios, { AxiosResponse } from "axios";



function deserializeResponse<T>(response: AxiosResponse<any>): T {
    return JSON.parse(response.data as string) as T;
}

export class ApiClient {
    /**
     * つっこみのデータの一覧を取得
    */
    async fetchList(): Promise<FetchListResponse> {
        const res = await axios.post("localhost:8080/owarai-ar-api/api.php", {
            req: "fetch_list"
        });

        return deserializeResponse(res);
    }

    /**
     * つっこみの詳細情報を取得
     */
    async fetchTukkomiDetail(tukkomiId: string): Promise<TukkomiDetail> {
        const res = await axios.post("/api.php", {
            req: "fetch_tukkomi_detail"
        });

        return deserializeResponse(res);
    }

    /**
     * 同一のスポットを取得する (現在地から近い順)
     * @param latitude スポットの緯度
     * @param longitude スポットの経度
     */
    async fetchSameSpot(latitude: number, longitude: number): Promise<FetchSameReponse> {
        const res = await axios.post("/api.php", {
            req: "fetch_same"
        });

        return deserializeResponse(res);
    }

    /**
     * つっこみを追加する
     * @param spotLat スポットの緯度
     * @param spotLong スポットの経度
     * @param spotImg スポットの画像
     * @param spotImgId スポットの既存画像 (spotImg, spotImgId のいずれかが空値)
     */
    async addTukkomi(
        spotId: number,
        spotLat: number,
        spotLong: number,
        spotImg: string, // Base64文字列
        spotImgId: string): Promise<boolean> {
        const res = await axios.post("/api.php", {
            req: "add_tukkomi"
        });

        return true;
    }
}

type FetchListResponse = Array<TukkomiItemResponse>;
interface TukkomiItemResponse {
    /**
     * つっこみの内容
     */
    tukkomi_word: string;

    /**
     * つっこみの画像
     */
    tukkomi_img: string;

    /**
     * つっこみのID
     */

    tukkomi_id: string;

    /**
     * 緯度 -90 ~ 90
     */
    spot_lat: number;

    /**
     * 経度 -180 ~ 180
     */
    spot_long: number;
}

interface TukkomiDetail {
    /**
     * つっこみの内容
     */
    tukkomi_word: string;

    /**
     * つっこみの画像
     */
    tukkomi_img: string;

    /**
     * Like数
     */
    like: number;

    /**
     * ユーザー名
     */
    user_name: string;

    /**
     * ユーザーの画像
     */
    user_img: string;

    /**
     * ユーザーの自己紹介
     */
    user_bio: string;
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