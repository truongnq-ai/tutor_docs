# [API NAME] API CONTRACT

← Quay lại: [README.md](../README.md)

## Tổng quan

Tài liệu này mô tả API contract cho [API name].

## [METHOD] /api/v1/[endpoint]

### Mô tả
[Mô tả ngắn gọn về API]

### Request

**Headers:**
```
Authorization: Bearer {access_token}
Content-Type: application/json
```

**Path Parameters:**
- [param] ([type]): [Mô tả]

**Query Parameters:**
- [param] ([type]): [Mô tả]

**Body:**
```json
{
  "example": "request"
}
```

### Response

**Status: 200 OK**

```json
{
  "example": "response"
}
```

### Error Responses

**Status: 400 Bad Request**
```json
{
  "error": "ERROR_CODE",
  "message": "Error message"
}
```

## Tài liệu liên quan

- [Related Domain Models](../02-domain-model/)
- [Related Product Rules](../03-product-rules/)

---

← Quay lại: [README.md](../README.md)

