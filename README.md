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


Inbox pattern diagram [here](./inbox_pattern_explanation.pdf)

Docs and resources:
- [https://learn.microsoft.com/en-us/azure/service-bus-messaging/duplicate-detection](https://learn.microsoft.com/en-us/azure/service-bus-messaging/duplicate-detection)
- [https://codeopinion.com/handling-duplicate-messages-idempotent-consumers/](https://codeopinion.com/handling-duplicate-messages-idempotent-consumers/)
- [https://event-driven.io/en/outbox_inbox_patterns_and_delivery_guarantees_explained/](https://event-driven.io/en/outbox_inbox_patterns_and_delivery_guarantees_explained/)
- [https://softwaremill.com/microservices-101/](https://softwaremill.com/microservices-101/)
- [https://softwaremill.com/message-delivery-and-deduplication-strategies/](https://softwaremill.com/message-delivery-and-deduplication-strategies/)
- [https://exactly-once.github.io/posts/exactly-once-delivery/](https://exactly-once.github.io/posts/exactly-once-delivery/)
- [https://www.youtube.com/watch?v=ebyR5RPKciw](https://www.youtube.com/watch?v=ebyR5RPKciw)
- [https://www.youtube.com/watch?v=xeBY8fCWfvU](https://www.youtube.com/watch?v=xeBY8fCWfvU)