import { queryOptions } from "@tanstack/react-query";
import type { TileType } from "../types/Map";
import axios from "axios";
import { queryClient } from "../App";

const generateMap = async (): Promise<TileType[][]> => {
    const mapId = localStorage.getItem("mapId");
    if (mapId) {
        const response = await axios.get(`https://zj9tm2bf-8000.euw.devtunnels.ms/api/maps/${mapId}`);
        return response.data.tiles;
    }

    const response = await axios.post("https://zj9tm2bf-8000.euw.devtunnels.ms/api/maps/", {
        width: 30,
        height: 30,
        seedCount: 5,
        iterations: 10
    });

    localStorage.setItem("mapId", response.data.id);
    // const response = await axios.get("map.json")
    return response.data.tiles;
}

export function mapQueryOptions(){
    return queryOptions({
        queryKey: ["map"],
        queryFn: generateMap,
        staleTime: Infinity
    })
}

export function removeCurrentMap(){
    localStorage.removeItem("mapId");
    queryClient.refetchQueries({ queryKey: mapQueryOptions().queryKey });
}