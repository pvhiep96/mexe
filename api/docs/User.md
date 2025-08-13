# User


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [optional] [default to undefined]
**email** | **string** |  | [optional] [default to undefined]
**full_name** | **string** |  | [optional] [default to undefined]
**phone** | **string** |  | [optional] [default to undefined]
**avatar** | **string** |  | [optional] [default to undefined]
**date_of_birth** | **string** |  | [optional] [default to undefined]
**gender** | **string** |  | [optional] [default to undefined]
**is_active** | **boolean** |  | [optional] [default to undefined]
**is_verified** | **boolean** |  | [optional] [default to undefined]
**email_verified_at** | **string** |  | [optional] [default to undefined]
**phone_verified_at** | **string** |  | [optional] [default to undefined]
**last_login_at** | **string** |  | [optional] [default to undefined]
**addresses** | [**Array&lt;UserAddress&gt;**](UserAddress.md) |  | [optional] [default to undefined]

## Example

```typescript
import { User } from './api';

const instance: User = {
    id,
    email,
    full_name,
    phone,
    avatar,
    date_of_birth,
    gender,
    is_active,
    is_verified,
    email_verified_at,
    phone_verified_at,
    last_login_at,
    addresses,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
