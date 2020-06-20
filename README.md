# reproduce-lb4-bug-oas-array

[![LoopBack](<https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png>)](http://loopback.io/)

# issue

- array\[string\] is correctly parsed, but **array\[number\] is NOT correctly parsed.**
  - like this: `?params=123&params=456`
  - expected: `[ 123, 456 ]`
  - actual: `[ "123", "456" ]`
- and, unsupported array query params is delimited comma
  - like this: `?params=123,456`
    - expected: `[ 123, 456 ]`
    - actual: `"123,456"`

# backgrond

- I would like to use array query params is delimited comma

# reproduce

### 1. create app

```
$ lb4 app
$ lb4 controller # add Hello
```

### 2. create [HelloController](./src/controllers/hello.controller.ts)

- `/hello_array_parse`
  - use array for query params
- `/hello_comma_parse`
  - use array for query params which is delimited comma
    - with `style: 'form', explode: false`
    - cf. https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md#style-values

### 3. check for behavers

#### case1: request query by array params

request

```
http://[::1]:3000/hello_array_parse?greeting=hello&numberArray=12345&numberArray=123&stringArray=abcde&stringArray=abc
```

reponse

```
{
  "greeting": "hello",
  "numberArray": [
    "12345",
    "123"
  ],
  "stringArray": [
    "abcde",
    "abc"
  ]
}
```

issue

- `numberArray` is not parsed.
- `items: { pattern: .. }` is ignored.

#### case2: request query by array params which delimited by comma

request

```
http://[::1]:3000/hello_comma_array?greeting=hello&numberArray=12345,678&stringArray=abcde,fgh
```

response

```
{
  "greeting": "hello",
  "numberArray": "12345,678",
  "stringArray": "abcde,fgh"
}
```

issue

- I don't use `@param.array` for delimited by comma request params array
- numberArray, stringArray are not parsed.
  - so I should split by comma
- `items: { pattern: .. }` is ignored.
