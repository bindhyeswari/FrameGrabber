self.addEventListener('message', (event) => {

    var canvas = event.data;

    self.postMessage(`Returning from the worker: got the canvas`);
});

