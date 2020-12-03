class EndWebpackPlugin {
    constructor(doneCallback, failCallback) {
        this.doneCallback = doneCallback;
        this.failCallback = failCallback;
    }

    apply (compiler){
        compiler.hooks.done.tap('done',(stats) => {
            // 在 done 事件中回调 doneCallback
            console.log("done");
            this.doneCallback(stats);
        });
        compiler.hooks.failed.tap('failed',(stats) => {
            // 在 done 事件中回调 doneCallback
            console.log("failed");
            this.failCallback(stats);
        });
    }
}

module.exports = EndWebpackPlugin;
