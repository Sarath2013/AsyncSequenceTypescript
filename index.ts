async function sleep(ms: number) {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms)
    })
}

async function randomDelay() {
    const randomTime = Math.round(Math.random() * 1000)
    return sleep(randomTime)
}

class ShipmentSearchIndex {
    async updateShipment(id: string, shipmentData: any) {
        const startTime = new Date()
        await randomDelay()
        const endTime = new Date()
        console.log(`update ${id}@${
            startTime.toISOString()
            } finished@${
            endTime.toISOString()
            }`
        )

        return { startTime, endTime }
    }
}

// Implementation needed
interface ShipmentUpdateListenerInterface {
    receiveUpdate(id: string, shipmentData: any);
}

class ShipmentUpdate implements ShipmentUpdateListenerInterface {
    private shipSearchIndex: ShipmentSearchIndex = new ShipmentSearchIndex();

    async receiveUpdate(id: string, shipmentData: any) {
        await this.shipSearchIndex.updateShipment(id, shipmentData);
    }

    // Async getShipments method uses 'for..Of' and 'await' to run shipments in Sequence.
    async getShipments(shipmentData: any) {
        let i: number = 0;
        for (const data of shipmentData)
            await this.receiveUpdate(`shipment${++i}`, data);
    }
}

(function () {
    let shipments: any = [{ product: 'Mobile', count: 2 }, { product: 'Camera', count: 5 }, { product: 'LED TV', count: 1 }];
    let shipmentUpdate = new ShipmentUpdate();
    shipmentUpdate.getShipments(shipments);
})();