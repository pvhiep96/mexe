# DefaultApi

All URIs are relative to */api/v1*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**createOrder**](#createorder) | **POST** /orders | Create a new order|
|[**getOrder**](#getorder) | **GET** /orders/{id} | Get order details|
|[**getProduct**](#getproduct) | **GET** /products/{id} | Get product details|
|[**getUser**](#getuser) | **GET** /users/me | Get authenticated user details|
|[**listOrders**](#listorders) | **GET** /orders | List all orders for the authenticated user|
|[**listProducts**](#listproducts) | **GET** /products | List all products|
|[**listStores**](#liststores) | **GET** /stores | List all stores|
|[**listbrands**](#listbrands) | **GET** /brands | List all brands|
|[**listcategory**](#listcategory) | **GET** /categories | List all Cagegory|

# **createOrder**
> Order createOrder(createOrderRequest)


### Example

```typescript
import {
    DefaultApi,
    Configuration,
    CreateOrderRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let createOrderRequest: CreateOrderRequest; //

const { status, data } = await apiInstance.createOrder(
    createOrderRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **createOrderRequest** | **CreateOrderRequest**|  | |


### Return type

**Order**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Order created successfully |  -  |
|**422** | Invalid request |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getOrder**
> OrderDetail getOrder()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let id: string; //Order ID or order number (default to undefined)

const { status, data } = await apiInstance.getOrder(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Order ID or order number | defaults to undefined|


### Return type

**OrderDetail**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful response |  -  |
|**404** | Order not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getProduct**
> ProductDetail getProduct()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let id: string; //Product ID or slug (default to undefined)

const { status, data } = await apiInstance.getProduct(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Product ID or slug | defaults to undefined|


### Return type

**ProductDetail**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful response |  -  |
|**404** | Product not found |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **getUser**
> User getUser()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.getUser();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**User**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful response |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listOrders**
> ListOrders200Response listOrders()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let page: number; //Page number for pagination (optional) (default to 1)
let perPage: number; //Number of orders per page (optional) (default to 20)
let status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'; //Filter by order status (optional) (default to undefined)

const { status, data } = await apiInstance.listOrders(
    page,
    perPage,
    status
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | Page number for pagination | (optional) defaults to 1|
| **perPage** | [**number**] | Number of orders per page | (optional) defaults to 20|
| **status** | [**&#39;pending&#39; | &#39;processing&#39; | &#39;shipped&#39; | &#39;delivered&#39; | &#39;cancelled&#39;**]**Array<&#39;pending&#39; &#124; &#39;processing&#39; &#124; &#39;shipped&#39; &#124; &#39;delivered&#39; &#124; &#39;cancelled&#39;>** | Filter by order status | (optional) defaults to undefined|


### Return type

**ListOrders200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listProducts**
> ListProducts200Response listProducts()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

let page: number; //Page number for pagination (optional) (default to 1)
let perPage: number; //Number of products per page (optional) (default to 20)
let categoryId: number; //Filter by category ID (optional) (default to undefined)
let brandId: number; //Filter by brand ID (optional) (default to undefined)
let isActive: boolean; //Filter by active status (optional) (default to true)

const { status, data } = await apiInstance.listProducts(
    page,
    perPage,
    categoryId,
    brandId,
    isActive
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | Page number for pagination | (optional) defaults to 1|
| **perPage** | [**number**] | Number of products per page | (optional) defaults to 20|
| **categoryId** | [**number**] | Filter by category ID | (optional) defaults to undefined|
| **brandId** | [**number**] | Filter by brand ID | (optional) defaults to undefined|
| **isActive** | [**boolean**] | Filter by active status | (optional) defaults to true|


### Return type

**ListProducts200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful response |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listStores**
> ListStores200Response listStores()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.listStores();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**ListStores200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful response |  -  |
|**400** | Bad request |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listbrands**
> Listbrands200Response listbrands()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.listbrands();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Listbrands200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful response |  -  |
|**400** | Bad request |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **listcategory**
> Listcategory200Response listcategory()


### Example

```typescript
import {
    DefaultApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new DefaultApi(configuration);

const { status, data } = await apiInstance.listcategory();
```

### Parameters
This endpoint does not have any parameters.


### Return type

**Listcategory200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Successful response |  -  |
|**400** | Bad request |  -  |
|**500** | Internal server error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

