"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRichContent = exports.isDateDifferenceWithin7Days = void 0;
function isDateDifferenceWithin7Days(date1, date2) {
    const firstDate = new Date(date1);
    const secondDate = new Date(date2);
    const difference = Math.abs(firstDate - secondDate);
    const daysDifference = difference / (1000 * 60 * 60 * 24);
    return daysDifference <= 7;
}
exports.isDateDifferenceWithin7Days = isDateDifferenceWithin7Days;
function createRichContent(data, chatMessage) {
    var _a, _b, _c, _d;
    if (!data.richContent)
        return;
    if ((_a = data.richContent.reply) === null || _a === void 0 ? void 0 : _a.id) {
        const { id } = data.richContent.reply;
        chatMessage.richContent = {
            reply: { id },
        };
    }
    if ((_b = data.richContent.giphy) === null || _b === void 0 ? void 0 : _b.id) {
        const { id, type, height, width, aspectRatio } = data.richContent.giphy;
        const trimmedAspectRatio = Number(aspectRatio.toPrecision(3));
        chatMessage.richContent = {
            ...(chatMessage.richContent || {}),
            giphy: { id, type, height, width, aspectRatio: trimmedAspectRatio },
        };
    }
    if ((_c = data.richContent.images) === null || _c === void 0 ? void 0 : _c.length) {
        chatMessage.richContent = {
            ...(chatMessage.richContent || {}),
            images: data.richContent.images,
        };
    }
    if ((_d = data.richContent.attachments) === null || _d === void 0 ? void 0 : _d.length) {
        chatMessage.richContent = {
            ...(chatMessage.richContent || {}),
            attachments: data.richContent.attachments,
        };
    }
    if (data.richContent.poll) {
        chatMessage.richContent = {
            ...(chatMessage.richContent || {}),
            poll: data.richContent.poll,
        };
    }
}
exports.createRichContent = createRichContent;
//# sourceMappingURL=message.helper.js.map