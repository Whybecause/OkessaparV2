import { NextResponse } from "next/server";
import axios from "axios";

import { errorServer } from "@/utils/error-server";

export type DISCOVERY_VENUE_PROPS = {
  address: {
    line1: string;
  },
  city: {
    name: string,
  },
  country: {
    name: string,
    countryCode: string,
  },
  id: string;
  images: {
    fallback: boolean,
    url: string,
  }[],
  locale: string,
  location: {
    longitude: string,
    latitude: string,
  },
  name: string,
  postalCode: string,
  state: {
    name: string,
    stateCode: string,
  },
  test: boolean,
  timezone: string,
  type: string,
  upcomingEvents: {
    _total: number,
    _filtered: number,
  },
  url: string
}

const DISCOVERY_API_URL = "https://app.ticketmaster.com/discovery/v2";
const DISCOVERY_API_KEY = "ixGHekwvru05XSvdBJyp0JFxpSQJKToO";
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get("keyword");

    console.log(keyword);
    const response = await axios.get(`${DISCOVERY_API_URL}/venues.json`, {
      params: {
        apikey: DISCOVERY_API_KEY,
        keyword: keyword,
        locale: "fr",
        countryCode: "FR",
      }
    });
    const data: DISCOVERY_VENUE_PROPS[] = response.data?._embedded?.venues || [];

    return NextResponse.json(data);
  } catch (error) {
    return errorServer("Error", error, 500);
  }
}
