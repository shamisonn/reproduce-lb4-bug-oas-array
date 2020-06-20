import { get, param, ResponseObject } from "@loopback/rest";
/**
 * OpenAPI response for hello()
 */
const HELLO_RESPONSE: ResponseObject = {
  description: "Hello Response",
  content: {
    "application/json": {
      schema: {
        type: "object",
        title: "HelloResponse",
        properties: {
          numberArray: { type: "array", items: { type: "number" } },
          stringArray: { type: "array", items: { type: "string" } },
        },
      },
    },
  },
};

export class HelloController {
  constructor() {}

  @get("/hello_array_parse", {
    responses: {
      "200": HELLO_RESPONSE,
    },
  })
  async helloArrayParse(
    @param.array("numberArray", "query", {
      description: "number array",
      items: {
        type: "number",
        pattern: "[0-9]{4}",
      },
    }) numberArray: number[],
    @param.array("stringArray", "query", {
      description: "string array",
      items: {
        type: "string",
        pattern: "[a-zA-Z]{4}",
      },
    }) stringArray: string[],
  ): Promise<object> {
    // console.log("number array:");
    // console.log(numberArray);
    // console.log(`length: ${numberArray.length}`);
    // console.log("string array:");
    // console.log(stringArray);
    // console.log(`length: ${stringArray.length}`);
    return {
      numberArray: numberArray,
      stringArray: stringArray,
    };
  }

  @get("/hello_comma_array", {
    responses: {
      "200": HELLO_RESPONSE,
    },
  })
  async helloCommaArray(
    // ref. https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#style-values
    @param({
      name: "numberArray",
      in: "query",
      description: "number array",
      schema: {
        type: "array",
        items: {
          type: "number",
          pattern: "[0-9]{4}",
        },
      },
      style: "form",
      explode: false,
    }) numberArray: number[],
    @param({
      name: "stringArray",
      in: "query",
      description: "string array",
      schema: {
        type: "array",
        items: {
          type: "string",
          pattern: "[a-zA-Z]{4}",
        },
      },
      style: "form",
      explode: false,
    }) stringArray: string[],
  ): Promise<object> {
    // console.log("number array:");
    // console.log(numberArray);
    // console.log(`length: ${numberArray.length}`);
    // console.log("string array:");
    // console.log(stringArray);
    // console.log(`length: ${stringArray.length}`);
    return {
      numberArray: numberArray,
      stringArray: stringArray,
    };
  }
}
