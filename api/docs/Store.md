# Store


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | Unique identifier for the store. | [optional] [default to undefined]
**name** | **string** | Name of the store. | [optional] [default to undefined]
**address** | **string** | Full address of the store. | [optional] [default to undefined]
**phone** | **string** | Contact phone number of the store. | [optional] [default to undefined]
**email** | **string** | Contact email of the store. | [optional] [default to undefined]
**city** | **string** | City where the store is located. | [optional] [default to undefined]
**is_active** | **boolean** | Indicates if the store is active. | [optional] [default to undefined]
**opening_hours** | **object** | JSON object containing the store\&#39;s opening hours. | [optional] [default to undefined]
**created_at** | **string** | Timestamp when the store was created. | [optional] [default to undefined]
**updated_at** | **string** | Timestamp when the store was last updated. | [optional] [default to undefined]

## Example

```typescript
import { Store } from './api';

const instance: Store = {
    id,
    name,
    address,
    phone,
    email,
    city,
    is_active,
    opening_hours,
    created_at,
    updated_at,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
