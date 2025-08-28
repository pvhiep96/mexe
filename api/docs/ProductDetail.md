# ProductDetail


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** |  | [optional] [default to undefined]
**name** | **string** |  | [optional] [default to undefined]
**slug** | **string** |  | [optional] [default to undefined]
**sku** | **string** |  | [optional] [default to undefined]
**description** | **string** |  | [optional] [default to undefined]
**short_description** | **string** |  | [optional] [default to undefined]
**brand** | [**Brand**](Brand.md) |  | [optional] [default to undefined]
**category** | [**Category**](Category.md) |  | [optional] [default to undefined]
**price** | **number** |  | [optional] [default to undefined]
**original_price** | **number** |  | [optional] [default to undefined]
**discount_percent** | **number** |  | [optional] [default to undefined]
**cost_price** | **number** |  | [optional] [default to undefined]
**weight** | **number** |  | [optional] [default to undefined]
**dimensions** | **string** |  | [optional] [default to undefined]
**stock_quantity** | **number** |  | [optional] [default to undefined]
**min_stock_alert** | **number** |  | [optional] [default to undefined]
**is_active** | **boolean** |  | [optional] [default to undefined]
**is_featured** | **boolean** |  | [optional] [default to undefined]
**is_new** | **boolean** |  | [optional] [default to undefined]
**is_hot** | **boolean** |  | [optional] [default to undefined]
**is_preorder** | **boolean** |  | [optional] [default to undefined]
**preorder_quantity** | **number** |  | [optional] [default to undefined]
**preorder_end_date** | **string** |  | [optional] [default to undefined]
**warranty_period** | **number** |  | [optional] [default to undefined]
**meta_title** | **string** |  | [optional] [default to undefined]
**meta_description** | **string** |  | [optional] [default to undefined]
**view_count** | **number** |  | [optional] [default to undefined]
**images** | [**Array&lt;ProductImage&gt;**](ProductImage.md) |  | [optional] [default to undefined]
**variants** | [**Array&lt;ProductVariant&gt;**](ProductVariant.md) |  | [optional] [default to undefined]
**specifications** | [**Array&lt;ProductSpecification&gt;**](ProductSpecification.md) |  | [optional] [default to undefined]

## Example

```typescript
import { ProductDetail } from './api';

const instance: ProductDetail = {
    id,
    name,
    slug,
    sku,
    description,
    short_description,
    brand,
    category,
    price,
    original_price,
    discount_percent,
    cost_price,
    weight,
    dimensions,
    stock_quantity,
    min_stock_alert,
    is_active,
    is_featured,
    is_new,
    is_hot,
    is_preorder,
    preorder_quantity,
    preorder_end_date,
    warranty_period,
    meta_title,
    meta_description,
    view_count,
    images,
    variants,
    specifications,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
