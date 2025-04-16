QUIDAX Documentation
instant swap
Introduction

The Instant Swap Collection feature lets your users exchange one type of cryptocurrency for another or fiat.

Actions you can perform.

* Fetch all instant swaps created by an authenticated user or sub-user.
* Fetch details of an instant swap created by an authenticated user or sub-user.
* Requote an instant swap.
* Cancel an instant swap.

Create Instant swap
POST
https://www.quidax.com/api/v1/users/{user_id}/swap_quotation
This endpoint is used to create an instant swap quotation.

BODY PARAMS from_currency string
the currency you are swapping from

to_currency string
the currency you are swapping to.

from_amount string
the amount you want to swap.

METADATA
user_id string required

Defaults to me
The User ID. Use 'me' if fetching wallets of main authenticated user, use the user_id if fetching for Sub-account linked to the authenticated user

RESPONSES
200
400

Confirm Instant Swap
POST
https://www.quidax.com/api/v1/users/{user_id}/swap_quotation/{quotation_id}/confirm
This endpoint is used to confirm an instant swap quotation.


METADATA
user_id string required

Defaults to me
The User ID. Use 'me' if fetching wallets of main authenticated user, use the user_id if fetching for Sub-account linked to the authenticated user

quotation_id string required
ID of a swap quotation

RESPONSES
200
400

Refresh Instant Swap Quotation
POST
https://www.quidax.com/api/v1/users/{user_id}/swap_quotation/{quotation_id}/refresh
This endpoint is used to refresh an instant swap quotation.


BODY PARAMS
from_currency string
the currency you are swapping from

to_currency string
the currency you are swapping to.

from_amount string
the amount you want to swap.

METADATA
user_id string required

Defaults to me
The User ID. Use 'me' if fetching wallets of main authenticated user, use the user_id if fetching for Sub-account linked to the authenticated user

quotation_id string required
ID of a swap quotation

RESPONSES
200
400

Fetch Swap Transaction
GET
https://www.quidax.com/api/v1/users/{user_id}/swap_transactions/{swap_transaction_id}
This endpoint is used to fetch an instant swap transaction.

METADATA
user_id string required
Defaults to me

swap_transaction_id string required

RESPONSES
200
400

Get swap transactions
GET
https://www.quidax.com/api/v1/users/{user_id}/swap_transactions
Get user swap transactions for an authenticated user.

METADATA
user_id string required
Defaults to me

RESPONSES
200
400

Temporary swap quotation
POST
https://www.quidax.com/api/v1/users/{user_id}/temporary_swap_quotation
This endpoint is used to fetch swap quotation without creating a quotation

BODY PARAMS
from_currency string
the currency you are swapping from

to_currency string
the currency you are swapping to.

from_amount string
the amount you want to swap.

METADATA
user_id string required



RESPONSES
200
400

QUIDAX Create Sub-account
Introduction
The sub-accounts API allows you to create and manage sub-accounts on your integration. sub-accounts can generate cryptocurrency addresses, collect payments and track transaction status.

Action you can perform
* Create sub-accounts on behalf of your users.
* Edit your user's information
* Fetch all sub-accounts.
* Fetch Sub accounts.

Create a Sub-account
POST
https://www.quidax.com/api/v1/users
Create a sub account tethered to the authenticated user

Generating wallet address for your sub-accounts.
Wallet addresses are generated on demand for sub-accounts, so after creating a sub-account you would need to call the fetch payment address endpoint to create a wallet address for sub-account account which a wallet.address.generated webhook would be dispatched after the address has been created.
BODY PARAMS
email string
Defaults to test@gmail.com
The email of your sub user, the user email must be unique and it can't be changed.

first_name string
Defaults to test
The first name of your sub user, this field can be edited.

last_name string
Defaults to user
The last name of your sub user, this field can be edited.

RESPONSES
200
400

Fetch parent account.
GET
https://www.quidax.com/api/v1/users/me
This endpoints is used fetch user detail for parent account, this account are master account tethered for you to user.

RESPONSES
200
400

Edit Sub-account details
PUT
https://www.quidax.com/api/v1/users/{user_id}
Update sub-account information.

BODY PARAMS
first_name string
Defaults to test
The first name of your sub user, this field can be edited

last_name string
Defaults to tester
The last name of your sub user, this field can be edited.

phone_number string
The phone number of your sub user

METADATA
user_id string required
Defaults to me
The User ID. Use 'me' if fetching wallets of main authenticated user, use the user_id if fetching for Sub-account linked to the authenticated user.

RESPONSES
200
400

Fetch all Sub-accounts.
GET
https://www.quidax.com/api/v1/users
Fetch subaccounts tethered to your account.

Understanding the sections below is required to fully comprehend how Quidax handles pagination.
How Quidax handles pagination
Pagination
Quidax's API offers the ability to list through resources such as Withdraws, Instant Orders, and Orders, and more through its endpoints. For performance reasons, the API will return only a subset of the entire result set in each API call.
By default, all "List" endpoints return paginated results. You may use the query params per_page to control the number of results you see. For per_page the default will be 50 but can optionally be increased to a maximum of 100.
When reading paginated responses from the API, the following response headers will also be sent:
Header	Description
X-Next-Page	The next cursor value retrieves more results. If empty, then there are no more results to retrieve.
X-Total	Total resources created.
RESPONSES
200
400

Fetch Details of Subaccount
GET
https://www.quidax.com/api/v1/users/{user_id}
Get details of a subaccount.

METADATA
user_id string required
Defaults to me
The User ID. Use 'me' if fetching wallets of main authenticated user, use the user_id if fetching for Sub-account linked to the authenticated user.

RESPONSES
200
400

QUIDAX Wallet
Introduction

Basically, Quidax allows you to programmatically create and manage both fiat and cryptocurrency wallets for your user.
Action you can perform.

* Create cryptocurrency wallets for Bitcoin, Litecoin, Ripple, Dash, Doge, Tron, Quidax Token, Ethereum, Bitcoin Cash, Solana, Floki Inu, Wakanda Inu, Tezos, Harmony, Cardano, Babydoge, Filecoin, Axie Infinity, Stellar, PancakeSwap, Chainlink, Polkadot, Shiba Inu, Aave, USD Coin, Binance USD, Polygon, Binance Coin, Dogecoin, Tether.
* Fetch user wallets.
* Fetch wallet information.
* initiate and confirm transactions programmatically.
* Send crypto to an external or internal wallet.

Fetch user wallets
GET
https://www.quidax.com/api/v1/users/{user_id}/wallets
Get all wallets linked to authenticated user or subaccount tethered.

METADATA
user_id string required
Defaults to me
The User ID. Use 'me' if fetching wallets of main authenticated user, use the user_id if fetching for Sub-account linked to the authenticated user.

RESPONSES
200
404

Fetch user wallet
GET
https://www.quidax.com/api/v1/users/{user_id}/wallets/{currency}
Get a single wallet linked to an authenticated user or subaccount tethered.

METADATA
user_id string required
Defaults to me

currency string required
Defaults to btc

RESPONSES
200
401

Fetch Payment Address
GET
https://www.quidax.com/api/v1/users/{user_id}/wallets/{currency}/address
Fetch default payment address for a wallet

METADATA
user_id string required
Defaults to me
The User ID. Use 'me' if fetching wallets of main authenticated user, use the user_id if fetching for Sub-account linked to the authenticated user.

currency string required
Defaults to btc
Allowed Currencies values: usdt, btc, ltc, eth, xrp, usdt, dash, trx, doge, xrp, bnb, matic, shib, axs, safemoon, cake, xlm, aave, link.

RESPONSES
200
400

Fetch Payment Addresses
GET
https://www.quidax.com/api/v1/users/{user_id}/wallets/{currency}/addresses
Get the deposits addresses assigned to a wallet. crypto deposits made to any of the wallet's addresses would immediately be reflected on the balance.

METADATA
user_id string required
Defaults to me
The User ID. Use 'me' if fetching wallets of main authenticated user, use the user_id if fetching for Sub-account linked to the authenticated user.

currency string required
Defaults to btc
Allowed Currencies values: usd, btc, ltc, eth, xrp, usdt, dash, trx, doge, xrp, bnb, matic, shib, axs, safemoon, cake, xlm, aave, link.

RESPONSES
200
400

Fetch Payment Address by id
GET
https://www.quidax.com/api/v1/users/{user_id}/wallets/{currency}/addresses/{address_id}
Get details of a payment address, tethered to an authenticated account.

METADATA
user_id string required

Defaults to me
The User ID. Use 'me' if fetching wallets of main authenticated user, use the user_id if fetching for Sub-account linked to the authenticated user.

currency
string required
Defaults to btc
Allowed Currencies values: usd, btc, ltc, eth, xrp, usdt, dash, trx, doge, xrp, bnb, matic, shib, axs, safemoon, cake, xlm, aave, link.

address_id string required
ID of the payment address to be retrieved

RESPONSES
200
400

Create Payment Address for a cryptocurrency
POST
https://www.quidax.com/api/v1/users/{user_id}/wallets/{currency}/addresses?
Create a Payment Address for a wallet, once you call the API, a wallet address would be created, then you would need to call the fetch_payment_by_id endpoint with the wallet id to get the wallet address that has been created.

Helpful Note
You can't create multiple wallet addresses for assets on the bep20 blockchain.

Webhooks for Wallet Generation
Wallet addresses are generated in the background. Upon completion of the process, we send a webhook notification named wallet.address.generated to your system, confirming the successful creation of the wallet address.
METADATA
user_id string required
Defaults to me
The User ID. Use 'me' if fetching wallets of main authenticated user, use the user_id if fetching for Sub-account linked to the authenticated user.

currency string required
Defaults to btc
Currency. Allowed valued: Required. Allowed values: Currencies - qdx, usd, ngn, ghs, btc, usdt, busd, cfx, usdc, cnhc, eth, bnb, xrp, ltc, wkd, bch, doge, dash, trx, one, link, cake, xlm, axs, shib, afen, bls, fil, ada, dot, babydoge, xtz, matic, sfm, aave, wsg, ckt, floki, sol, mana, ftm, sand, slp, enj, lrc, ape, sushi, zil. trx

network string
example: bep20, erc20, trc20.

RESPONSES
200
401
404

Quidax Quotes & Market Endpoints
GET
https://www.quidax.com/api/v1/quotes?market={market}&unit={unit}&kind={kind}&volume={volume}
A public endpoint that displays the last price of an asset.

PATH PARAMS
market
string
required

Defaults to btcngn
Optional. Allowed values: qdxusdt, btcusdt, btcngn, ethngn, qdxngn, xrpngn, dashngn, ltcngn, usdtngn, btcghs, usdtghs, trxngn, dogeusdt, bnbusdt, maticusdt, safemoonusdt, aaveusdt, shibusdt, dotusdt, linkusdt, cakeusdt, xlmusdt, xrpusdt, ltcusdt, ethusdt, trxusdt, axsusdt, wsgusdt, afenusdt, blsusdt, dashusdt. Defaults to btcngn if not specified.

unit string required
Defaults to btc
Currency. Allowed value: usd, btc, ltc, xrp, dash, trx, doge, xrp, bnb, matic, shib, axs, safemoon, cake, xlm, aave, link.

kind string required
Defaults to ask
ask or bid

volume string required
Defaults to 2
volume to buy or sell.

RESPONSES
200
400

PATH PARAMS
market string required
Defaults to btcngn

Optional. Allowed values: qdxusdt, btcusdt, btcngn, ethngn, qdxngn, xrpngn, dashngn, ltcngn, usdtngn, btcghs, usdtghs, trxngn, dogeusdt, bnbusdt, maticusdt, safemoonusdt, aaveusdt, shibusdt, dotusdt, linkusdt, cakeusdt, xlmusdt, xrpusdt, ltcusdt, ethusdt, trxusdt, axsusdt, wsgusdt, afenusdt, blsusdt, dashusdt. Defaults to btcngn if not specified.

unit string required
Defaults to btc
Currency. Allowed value: usd, btc, ltc, xrp, dash, trx, doge, xrp, bnb, matic, shib, axs, safemoon, cake, xlm, aave, link.

kind string required
Defaults to ask
ask or bid

volume string required
Defaults to 2
volume to buy or sell.


RESPONSE
{
  "status": "success",
  "message": "Successful",
  "data": {
    "price": {
      "unit": "NGN",
      "amount": "155530504.20832675452"
    },
    "total": {
      "unit": "NGN",
      "amount": "155530504.20832675452"
    },
    "volume": {
      "unit": "BTC",
      "amount": "1.0"
    },
    "fee": {
      "unit": "NGN",
      "amount": "3110610.0841665350904"
    },
    "receive": {
      "unit": "NGN",
      "amount": "152419894.1241602194296"
    }
  }
}


Introduction

The Market API collection enables users to have access to current market-related data such as tickers, k-line (HLOC) data, order book items, and market depth. Actions you can perform


Action you can perform.

* Get the last price of an asset.
* Fetch all available markets.
* Fetch a market ticker.
* Get all available market tickers.
* Fetch the trades made on the Quidax order book.

List all markets
GET
https://www.quidax.com/api/v1/markets
Returns a list of all available markets. The sorting of the list is based on Quidax's internal ranking of the markets.

List market tickers
GET
https://www.quidax.com/api/v1/markets/tickers
Returns the list of tickers(a cryptocurrency buy, sell, volume information) for all available markets. The sorting of the list is based on Quidax's internal ranking of the markets.

Fetch a market ticker
GET
https://www.quidax.com/api/v1/markets/tickers/{currency}
Returns the market ticker for a specific market.

Fetch k-line for a market
GET
https://www.quidax.com/api/v1/markets/{market}/k
Returns the k-line (OHLC) data for a specific market.

Fetch k-line data with pending trades for a market
GET
https://www.quidax.com/api/v1/markets/{currency}/k_with_pending_trades/{trade_id}
Returns the k-line (OHLC) data with pending trades, which are the trades not included in K data yet, because there's delay between trade generated and processed by K data generator.

Fetch order-book items for a market
GET
https://www.quidax.com/api/v1/markets/{currency}/order_book
Gets the volume of trades that are currently being processed by the order book.

Fetch depth data for a market
GET
https://www.quidax.com/api/v1/markets/{currency}/depth?limit={limit}
Get depth or specified market. Both asks and bids are sorted from highest price to lowest.


This is a test swap result with response code 200 from Quidax documentation
{
  "status": "success",
  "message": "Successful",
  "data": {
    "id": "ib2m2s7i",
    "from_currency": "USDT",
    "to_currency": "SOL",
    "from_amount": "3.254",
    "received_amount": "0.019281934593118",
    "execution_price": "0.0059256",
    "status": "initiated",
    "created_at": "2024-04-10T12:38:13.108Z",
    "updated_at": "2024-04-10T12:38:13.108Z",
    "swap_quotation": {
      "id": "v3w65wfl",
      "from_currency": "USDT",
      "to_currency": "SOL",
      "quoted_price": "0.0059256098933983",
      "quoted_currency": "SOL",
      "from_amount": "3.254",
      "to_amount": "0.019281934593118",
      "confirmed": true,
      "expires_at": "2024-04-10T12:38:21.000Z",
      "created_at": "2024-04-10T12:38:06.000Z",
      "updated_at": "2024-04-10T12:38:12.966Z",
      "user": {
        "id": "23azi7bj",
        "sn": "QDXXIRPXXKS",
        "email": "testuser@gmail.com",
        "reference": null,
        "first_name": "Oye",
        "last_name": "Olalekan",
        "display_name": "appstate",
        "created_at": "2021-04-09T09:48:14.000Z",
        "updated_at": "2024-03-12T10:34:34.000Z"
      }
    },
    "user": {
      "id": "23azi7bj",
      "sn": "QDXXIRPXXKS",
      "email": "testuser@gmail.com",
      "reference": null,
      "first_name": "Oye",
      "last_name": "Olalekan",
      "display_name": "appstate",
      "created_at": "2021-04-09T09:48:14.000Z",
      "updated_at": "2024-03-12T10:34:34.000Z"
    }
  }
}

{
  "status": "success",
  "message": "Successful",
  "data": {
    "id": "jfdja5nm",
    "from_currency": "NGN",
    "to_currency": "SOL",
    "quoted_price": "258578.803258812875",
    "quoted_currency": "NGN",
    "from_amount": "100.0",
    "to_amount": "0.000386",
    "confirmed": false,
    "expires_at": "2024-05-18T09:03:17.000Z",
    "created_at": "2024-05-18T09:00:59.000Z",
    "updated_at": "2024-05-18T09:03:02.000Z",
    "user": {
      "id": "23azi7bj",
      "sn": "QDXXIRPXXKS",
      "email": "johnsonoye123@gmail.com",
      "reference": null,
      "first_name": "Oye",
      "last_name": "Olalekan",
      "display_name": "appstate",
      "created_at": "2021-04-09T09:48:14.000Z",
      "updated_at": "2024-03-12T10:34:34.000Z"
    }
  }
}

Internal withdrawals: to move funds from main account to sub account

Example:
POST https://www.quidax.com/api/v1/users/me/withdraws

Body:
{
    "currency": "usdc",
    "amount": "1",
    "fund_uid": <sub_user_id>,
    "transaction_note": "Stay safe",
    "narration": "We love you."
}

Internal withdrawals: to move funds from sub account to main account

Example:
POST https://www.quidax.com/api/v1/users/<sub_account_id>/withdraws

Body:
{
    "currency": "usdc",
    "amount": "1",
    "fund_uid": <main_account_id>,
    "transaction_note": "Stay safe",
    "narration": "We love you."
}

Send crypto through the blockchain
POST https://www.quidax.com/api/v1/users/<sub_account_id>/withdraws

Note: you can use *me* if you want to send crypto from the main account.

Body:
{
    "currency": "usdc",
    "amount": "1",
    "fund_uid": <wallet_address>,
    "network": <blockchain_network>,
    "transaction_note": "Stay safe",
    "narration": "We love you."
}

to get main account id: use this endpoint https://docs.quidax.ng/reference/fetch-master-accounts


Fetch order-book items for a market
GET
https://www.quidax.com/api/v1/markets/{currency}/order_book
Gets the volume of trades that are currently being processed by the order book.

PATH PARAMS
currency string required

Defaults to btcngn
Allowed Currencies values: qdxusdt, btcusdt, btcngn, ethngn, qdxngn, xrpngn, dashngn, ltcngn, usdtngn, btcghs, usdtghs, trxngn, dogeusdt, bnbusdt, maticusdt, safemoonusdt, aaveusdt, shibusdt, dotusdt, linkusdt, cakeusdt, xlmusdt, xrpusdt, ltcusdt, ethusdt, trxusdt, axsusdt, wsgusdt, afenusdt, blsusdt, dashusdt.

ask_limit
string

Defaults to 20
Limit the number of returned sell orders. Type: Integer, Allowed values: 1..200. Default to 20.

bids_limit
string

Defaults to 20
Limit the number of returned buy orders. Type: Integer, Allowed values: 1..200. Default to 20.

Example 200 Response 

{
  "status": "success",
  "message": "Successful",
  "data": {
    "asks": [
      {
        "id": "7dd092fc-c8a4-4239-bb61-3bd5e27eac8b",
        "side": "sell",
        "ord_type": "limit",
        "price": "1656.75",
        "avg_price": "1656.75",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "15000.0",
        "volume": "14907.1631",
        "executed_volume": "92.8369",
        "trades_count": 5,
        "created_at": "2025-01-11T11:15:47.000+01:00",
        "updated_at": "2025-01-11T11:26:18.000+01:00"
      },
      {
        "id": "c5784291-4110-4905-8957-78e03a736015",
        "side": "sell",
        "ord_type": "limit",
        "price": "1658.88",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "741.74",
        "volume": "741.74",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T05:05:58.000+01:00",
        "updated_at": "2025-01-11T05:05:58.000+01:00"
      },
      {
        "id": "b1b25ef1-8d7d-4800-b55b-a681ad3fe3d0",
        "side": "sell",
        "ord_type": "limit",
        "price": "1659.35",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "158.68",
        "volume": "158.68",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T07:16:01.000+01:00",
        "updated_at": "2025-01-11T07:16:01.000+01:00"
      },
      {
        "id": "542d89ba-ab60-4bd7-aff8-e8dd9eead4bb",
        "side": "sell",
        "ord_type": "limit",
        "price": "1659.4",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "171.16",
        "volume": "171.16",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-10T21:15:32.000+01:00",
        "updated_at": "2025-01-10T21:15:32.000+01:00"
      },
      {
        "id": "be9fa6c8-e3a3-41a7-b68a-92d107dff781",
        "side": "sell",
        "ord_type": "limit",
        "price": "1660.4",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "700.04",
        "volume": "700.04",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-10T16:27:07.000+01:00",
        "updated_at": "2025-01-10T16:27:07.000+01:00"
      },
      {
        "id": "9b877b54-08db-4e28-a572-4a0790b2944a",
        "side": "sell",
        "ord_type": "limit",
        "price": "1662.54",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "819.64",
        "volume": "819.64",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:27:15.000+01:00",
        "updated_at": "2025-01-11T11:27:15.000+01:00"
      },
      {
        "id": "ad4c1fa9-6845-4a19-9e55-94205bd38401",
        "side": "sell",
        "ord_type": "limit",
        "price": "1662.55",
        "avg_price": "1662.55",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "11.4",
        "volume": "9.4191",
        "executed_volume": "1.9809",
        "trades_count": 2,
        "created_at": "2024-12-24T06:04:59.000+01:00",
        "updated_at": "2025-01-10T14:23:14.000+01:00"
      },
      {
        "id": "de8b6957-0bad-493e-a374-64d767638cab",
        "side": "sell",
        "ord_type": "limit",
        "price": "1663.15",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "855.57",
        "volume": "855.57",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:27:10.000+01:00",
        "updated_at": "2025-01-11T11:27:10.000+01:00"
      },
      {
        "id": "45812ef3-7eb7-4424-baa1-3d0e9fd191ae",
        "side": "sell",
        "ord_type": "limit",
        "price": "1663.31",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "5818.12",
        "volume": "5818.12",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:26:23.000+01:00",
        "updated_at": "2025-01-11T11:26:23.000+01:00"
      },
      {
        "id": "f5660c0a-a636-4a93-8c6a-2c8706335fe5",
        "side": "sell",
        "ord_type": "limit",
        "price": "1663.86",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "7626.02",
        "volume": "7626.02",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:27:10.000+01:00",
        "updated_at": "2025-01-11T11:27:10.000+01:00"
      },
      {
        "id": "9d7e444d-4742-4508-98fb-07830b91a83b",
        "side": "sell",
        "ord_type": "limit",
        "price": "1664.02",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "6310.32",
        "volume": "6310.32",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:26:24.000+01:00",
        "updated_at": "2025-01-11T11:26:24.000+01:00"
      },
      {
        "id": "bc1a37eb-e457-4271-90d9-a37b84a19b4f",
        "side": "sell",
        "ord_type": "limit",
        "price": "1664.57",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "5294.64",
        "volume": "5294.64",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:27:10.000+01:00",
        "updated_at": "2025-01-11T11:27:10.000+01:00"
      },
      {
        "id": "0bdc55ba-1f52-4cc9-95e9-9427cc9260f7",
        "side": "sell",
        "ord_type": "limit",
        "price": "1664.73",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "28961.13",
        "volume": "28961.13",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:26:24.000+01:00",
        "updated_at": "2025-01-11T11:26:24.000+01:00"
      },
      {
        "id": "6c751e4b-9d03-4676-b6cf-e7d1a9e11442",
        "side": "sell",
        "ord_type": "limit",
        "price": "1665.0",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "11.48",
        "volume": "11.48",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2024-12-22T12:24:02.000+01:00",
        "updated_at": "2024-12-22T12:24:02.000+01:00"
      },
      {
        "id": "dd03ad34-b160-4bd2-a09d-16a719ee326a",
        "side": "sell",
        "ord_type": "limit",
        "price": "1665.28",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "25726.37",
        "volume": "25726.37",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:27:10.000+01:00",
        "updated_at": "2025-01-11T11:27:10.000+01:00"
      },
      {
        "id": "dcd794c0-d324-4d8f-bae1-2a8811ef6942",
        "side": "sell",
        "ord_type": "limit",
        "price": "1665.44",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "23250.87",
        "volume": "23250.87",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:26:24.000+01:00",
        "updated_at": "2025-01-11T11:26:24.000+01:00"
      },
      {
        "id": "477f1436-63f3-4f4d-8be6-feca43c2b8c1",
        "side": "sell",
        "ord_type": "limit",
        "price": "1665.99",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "19140.78",
        "volume": "19140.78",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:27:10.000+01:00",
        "updated_at": "2025-01-11T11:27:10.000+01:00"
      },
      {
        "id": "72cefa59-eda7-421d-b870-e57540b4811e",
        "side": "sell",
        "ord_type": "limit",
        "price": "1666.01",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "26.53",
        "volume": "26.53",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2024-12-21T18:22:07.000+01:00",
        "updated_at": "2024-12-21T18:22:07.000+01:00"
      },
      {
        "id": "2334916d-a27f-4795-bc71-a36752530f66",
        "side": "sell",
        "ord_type": "limit",
        "price": "1666.15",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "3935.48",
        "volume": "3935.48",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:26:24.000+01:00",
        "updated_at": "2025-01-11T11:26:24.000+01:00"
      },
      {
        "id": "2eb48ea2-b386-4b35-abda-4813758517a5",
        "side": "sell",
        "ord_type": "limit",
        "price": "1666.7",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "11308.53",
        "volume": "11308.53",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:27:11.000+01:00",
        "updated_at": "2025-01-11T11:27:11.000+01:00"
      }
    ],
    "bids": [
      {
        "id": "57636b4f-d286-473f-94af-3e0554c8d23b",
        "side": "buy",
        "ord_type": "limit",
        "price": "1654.1",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "604.55",
        "volume": "604.55",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:27:14.000+01:00",
        "updated_at": "2025-01-11T11:27:14.000+01:00"
      },
      {
        "id": "0ac9ab90-40fd-40e3-84d1-88e655265a0f",
        "side": "buy",
        "ord_type": "limit",
        "price": "1654.09",
        "avg_price": "1654.09",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "3135.64",
        "volume": "3096.7437",
        "executed_volume": "38.8963",
        "trades_count": 2,
        "created_at": "2025-01-11T11:23:36.000+01:00",
        "updated_at": "2025-01-11T11:26:43.000+01:00"
      },
      {
        "id": "01e6c5ac-dfbe-4cee-97bd-bfa039e6fcdb",
        "side": "buy",
        "ord_type": "limit",
        "price": "1653.35",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "19450.28",
        "volume": "19450.28",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:26:24.000+01:00",
        "updated_at": "2025-01-11T11:26:24.000+01:00"
      },
      {
        "id": "05c93eff-443e-441c-a83d-7effeaab67a0",
        "side": "buy",
        "ord_type": "limit",
        "price": "1653.19",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "24913.32",
        "volume": "24913.32",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:27:11.000+01:00",
        "updated_at": "2025-01-11T11:27:11.000+01:00"
      },
      {
        "id": "d19f9355-5e6b-42b0-879e-38fb99b81c0d",
        "side": "buy",
        "ord_type": "limit",
        "price": "1652.71",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "853.14",
        "volume": "853.14",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T10:52:21.000+01:00",
        "updated_at": "2025-01-11T10:52:21.000+01:00"
      },
      {
        "id": "b19ca564-5cef-40f7-8310-53da05288d8c",
        "side": "buy",
        "ord_type": "limit",
        "price": "1652.7",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "3057.66",
        "volume": "3057.66",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T10:51:11.000+01:00",
        "updated_at": "2025-01-11T10:51:11.000+01:00"
      },
      {
        "id": "11c8ec68-ef5d-43d3-a7e7-9c898222bc63",
        "side": "buy",
        "ord_type": "limit",
        "price": "1652.7",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "3420.45",
        "volume": "3420.45",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T10:55:49.000+01:00",
        "updated_at": "2025-01-11T10:55:49.000+01:00"
      },
      {
        "id": "bea99cb9-b29a-437f-823b-f36de6eb96c5",
        "side": "buy",
        "ord_type": "limit",
        "price": "1652.64",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "24882.84",
        "volume": "24882.84",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:26:24.000+01:00",
        "updated_at": "2025-01-11T11:26:24.000+01:00"
      },
      {
        "id": "7dc47677-8f38-41b7-8615-847218e3133c",
        "side": "buy",
        "ord_type": "limit",
        "price": "1652.48",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "11811.92",
        "volume": "11811.92",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:27:11.000+01:00",
        "updated_at": "2025-01-11T11:27:11.000+01:00"
      },
      {
        "id": "5f66367c-607b-468b-a137-b3cd635f514c",
        "side": "buy",
        "ord_type": "limit",
        "price": "1651.93",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "16700.98",
        "volume": "16700.98",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:26:24.000+01:00",
        "updated_at": "2025-01-11T11:26:24.000+01:00"
      },
      {
        "id": "25a3e167-411b-438d-bb5c-0f183f43e302",
        "side": "buy",
        "ord_type": "limit",
        "price": "1651.77",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "11766.83",
        "volume": "11766.83",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:27:11.000+01:00",
        "updated_at": "2025-01-11T11:27:11.000+01:00"
      },
      {
        "id": "3d0bbe57-c314-42a3-9f55-d9abf5b8909a",
        "side": "buy",
        "ord_type": "limit",
        "price": "1651.22",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "19027.27",
        "volume": "19027.27",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:26:24.000+01:00",
        "updated_at": "2025-01-11T11:26:24.000+01:00"
      },
      {
        "id": "adca1591-d571-49dc-917c-fde6c8bb4c2d",
        "side": "buy",
        "ord_type": "limit",
        "price": "1651.05",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "28753.58",
        "volume": "28753.58",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:27:11.000+01:00",
        "updated_at": "2025-01-11T11:27:11.000+01:00"
      },
      {
        "id": "cc3b1d50-5f0e-4ca7-a39e-e0a49cd52515",
        "side": "buy",
        "ord_type": "limit",
        "price": "1650.51",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "26715.79",
        "volume": "26715.79",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:26:24.000+01:00",
        "updated_at": "2025-01-11T11:26:24.000+01:00"
      },
      {
        "id": "f4aa7202-19d8-45d5-9c6b-d5daf9de0720",
        "side": "buy",
        "ord_type": "limit",
        "price": "1650.34",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "22703.24",
        "volume": "22703.24",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:27:11.000+01:00",
        "updated_at": "2025-01-11T11:27:11.000+01:00"
      },
      {
        "id": "df6b5714-9ca8-417d-8e69-d5a4fe26cca0",
        "side": "buy",
        "ord_type": "limit",
        "price": "1650.0",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "5455.02",
        "volume": "5455.02",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T10:41:59.000+01:00",
        "updated_at": "2025-01-11T10:41:59.000+01:00"
      },
      {
        "id": "317129f9-39a0-4199-bc1b-e573885ae67d",
        "side": "buy",
        "ord_type": "limit",
        "price": "1649.8",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "18512.78",
        "volume": "18512.78",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:26:24.000+01:00",
        "updated_at": "2025-01-11T11:26:24.000+01:00"
      },
      {
        "id": "4429a9d8-86ba-46c9-b53a-3f1fa06d35ad",
        "side": "buy",
        "ord_type": "limit",
        "price": "1649.63",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "1141.77",
        "volume": "1141.77",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:27:11.000+01:00",
        "updated_at": "2025-01-11T11:27:11.000+01:00"
      },
      {
        "id": "659bde37-28da-421e-ae65-fd3413086b2d",
        "side": "buy",
        "ord_type": "limit",
        "price": "1649.11",
        "avg_price": "1649.11",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "24255.27",
        "volume": "17645.9244",
        "executed_volume": "6609.3456",
        "trades_count": 53,
        "created_at": "2025-01-09T00:40:41.000+01:00",
        "updated_at": "2025-01-11T07:51:26.000+01:00"
      },
      {
        "id": "0b870fcc-850f-4c04-ba21-030268abfc99",
        "side": "buy",
        "ord_type": "limit",
        "price": "1649.09",
        "avg_price": "0.0",
        "state": "wait",
        "currency": "usdtngn",
        "origin_volume": "23806.6",
        "volume": "23806.6",
        "executed_volume": "0.0",
        "trades_count": 0,
        "created_at": "2025-01-11T11:26:24.000+01:00",
        "updated_at": "2025-01-11T11:26:24.000+01:00"
      }
    ]
  }
}