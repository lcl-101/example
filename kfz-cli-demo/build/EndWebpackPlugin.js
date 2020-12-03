class EndWebpackPlugin {
    constructor(doneCallback, failCallback) {
        this.doneCallback = doneCallback;
        this.failCallback = failCallback;
    }

    apply (compiler){
        compiler.plugin('done', (stats) => {
            // 在 done 事件中回调 doneCallback
            this.doneCallback(stats);
        });
        compiler.plugin('failed', (err) => {
            // 在 failed 事件中回调 failCallback
            this.failCallback(err);
        });
    }
}

module.exports = EndWebpackPlugin;