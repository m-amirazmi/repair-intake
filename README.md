# Repair Intake

For the product goals and agreed domain decisions, see [Product and Domain](docs/product-domain.md).

This project is to build a repair intake system for smartphone repair shop. The purpose is to let the staff taking the repair order, must have some catalog as there are a lot of smartphone out there, then key in into the system together with user details and print out QR receipt so that user can start conversation on WhatsApp with the shop WhatsApp Bot.

Then, the technician will also receive WhatsApp notification with a link navigated to this system but with technician view to update the repair status. The technician must be authorized to do so and need to take a few snapshot of before and after.

Each time technician update, an automated/bot WhatsApp will send a notification to the user if user opt-in to receive the update including the photos/videos of before and after. Customer will also receive detail quotation message first and will ask them to proceed to repair or not especially when the quotation message is too pricey.

On the QR part, the front staff really need to play their role to let user scan right away on the QR receipt and send the WhatsApp message immediately so that they automatically opt-in with the notification. This is to reduce cost and friction.

## Users

1. Customer (Cs)
2. Technician (Tc)
3. Frontdesk (Fd)
4. Business Owner (Bo)
5. Admin (Ad)

## Data Table / Objects

### Users

- name
- phoneNumber

### CatalogBrand

-
-

### CatalogModel

-
-

### CatalogPart

-
-

### CatalogRepair
