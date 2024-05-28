## Nest with transactional poc

```bash
# Install dependencies
pnpm i

# Run migrations
pnpm exec prisma migrate dev

# Start the server
pnpm run start:dev
```

## Try it out

- Create a cart with `POST /cart` `{ "customerName": "John Doe" }`
    - ensure cart insert and CartInitialized outgoing message is saved in the same transaction
- List carts with `GET /cart`
    - ensure the cart is returned
- Delete a cart with `DELETE /cart` `{ "cartId": "<< cart-id >>", "messageId": "message-1" }` (simulates an async
  message)
    - ensure cart update, incoming (fake) message and CartInitialized outgoing message are saved in the same transaction