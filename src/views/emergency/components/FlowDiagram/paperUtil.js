/**
 * 画图引擎方法
 */
import * as joint from "jointjs";

const USED_COLOR = '#999';
const NORMAL_COLOR = "#2281da";
const HOVER_COLOR = "orange";
const CURRENT_COLOR = "orange";


/**
 * 初始化画布，并返回画布实例
 * @param {string} id div标签的id
 * @param {number} w 画布宽
 * @param {number} h 画布高
 * @param {function} cb 画布上事件回调通知
 * @returns 
 */
export function initPaper(id, w, h, cb) {
    const namespace = joint.shapes;
    const graph = new joint.dia.Graph({}, { cellNamespace: namespace });
    const paper = new joint.dia.Paper({
        el: document.getElementById(id),
        model: graph,
        width: w,
        height: h,
        gridSize: 1,
        background: {
            color: "#27408B00",
        },
        cellViewNamespace: namespace,
        interactive: false,
    });
    paper.cb = cb;

    // paper事件
    paper.on('cell:pointerdown', function (cellView, evt, x, y) {

        if (!paper.cb) {
            return;
        }
        let tmpAllCell = paper.model.getCells();

        tmpAllCell.forEach(cell => {
            console.log(cell);
            cell.metadata.current = undefined;
            if (cell.metadata.current) {
                cell.attr('body/fill', CURRENT_COLOR);
            } else {
                if (cell.metadata && cell.metadata.use) {
                    cell.attr('body/fill', USED_COLOR);
                } else {
                    cell.attr('body/fill', NORMAL_COLOR);
                }
            }
        });

        if (cellView.model.metadata && cellView.model.metadata.evt) {
            paper.cb(cellView.model.metadata, cellView);
            cellView.model.metadata.use = true;
            cellView.model.metadata.current = true;
            if (cellView.model.metadata.assists) {
                cellView.model.metadata.assists.forEach(a => {
                    let tar = tmpAllCell.find(c => {
                       return c.metadata.id === a;
                    });
                    if (tar) {
                        tar.metadata.use = true;
                        tar.attr('body/fill', USED_COLOR);
                    }
                });
            }
        }
    });
    paper.on('cell:mouseover', function (cellView, evt) {
        cellView.model.attr('body/fill', HOVER_COLOR);
    });
    paper.on('cell:mouseout', function (cellView, evt) {
        if (cellView.model.metadata.current) {
            cellView.model.attr('body/fill', CURRENT_COLOR);
        } else {
            if (cellView.model.metadata && cellView.model.metadata.use) {
                cellView.model.attr('body/fill', USED_COLOR);
            } else {
                cellView.model.attr('body/fill', NORMAL_COLOR);
            }
        }
    });


    return paper;
};

/**
 * 重新设置画布大小
 * @param {object} paper 画布实例 
 * @param {number} w 画布的新宽度
 * @param {number} h 画布的新高度
 */
export function resizePaper(paper, w, h) {
    paper.setDimensions(w, h);
    paper.scaleContentToFit();
};

/**
 * 绘制流程节点
 * @param {object} paper 画布实例
 * @param {object} ndata 节点数据
 */
export function drawNode(paper, ndata) {

    if (!ndata || !ndata.type) {
        return null;
    }

    let w = ndata.w > 0 ? ndata.w : 100;
    let h = ndata.h > 0 ? ndata.h : 40;
    let color = ndata.use ? USED_COLOR : NORMAL_COLOR;

    let model = null;
    if (ndata.type === "round") {
        model = new joint.shapes.standard.Rectangle();
        model.position(ndata.x, ndata.y);
        model.resize(w, h);
        model.attr({
            body: {
                fill: color,
                rx: h / 2,
                ry: h / 2,
                strokeWidth: 0,
                cursor: "pointer"
            },
            label: {
                text: ndata.text,
                fill: "#EEE",
                fontSize: 16,
                fontWeight: "bold",
                fontVariant: "small-caps",
                cursor: "pointer"
            },
        });
        model.addTo(paper.model);
    } else if (ndata.type === "square") {
        model = new joint.shapes.standard.Rectangle();
        model.position(ndata.x, ndata.y);
        model.resize(w, h);
        model.attr({
            body: {
                fill: color,
                strokeWidth: 0,
                cursor: "pointer"
            },
            label: {
                text: ndata.text,
                fill: "#EEE",
                fontSize: 16,
                fontWeight: "bold",
                fontVariant: "small-caps",
                cursor: "pointer"
            },
        });
        model.addTo(paper.model);
    } else if (ndata.type === "polygon") {
        model = new joint.shapes.standard.Polygon();
        model.position(ndata.x, ndata.y);
        model.resize(w, h);
        model.attr({
            body: {
                fill: color,
                strokeWidth: 0,
                refPoints: `${w / 2},${0} ${0},${h / 2} ${w / 2},${h} ${w},${h / 2}`,
                cursor: "pointer"
            },
            label: {
                text: ndata.text,
                fill: "#EEE",
                fontSize: 16,
                fontWeight: "bold",
                fontVariant: "small-caps",
                cursor: "pointer"
            },
        });
        model.addTo(paper.model);
    }
    if (model) {
        model.metadata = ndata;
    }
    return model;
};

/**
 * 绘制流程连线
 * @param {object} paper 画布实例 
 * @param {object} ldata 连线数据
 */
export function drawLink(paper, ldata, sourceModel, targetModel) {
    if (!ldata) {
        return null;
    }

    let sourceMarker = {};
    let targetMarker = {};

    if (ldata.sourcearrow) {
        sourceMarker = {
            type: "path",
            stroke: USED_COLOR,
            fill: USED_COLOR,
            d: "M 10 -5 0 0 10 5 Z",
        };
    }

    if (ldata.targetarrow) {
        targetMarker = {
            type: "path",
            stroke: USED_COLOR,
            fill: USED_COLOR,
            d: "M 10 -5 0 0 10 5 Z",
        };
    }

    let link = new joint.shapes.standard.Link();
    link.source(sourceModel);
    link.target(targetModel);
    link.attr({
        line: {
            stroke: USED_COLOR,
            strokeWidth: 2,
            sourceMarker: sourceMarker,
            targetMarker: targetMarker,
        },
    });

    ldata.labels.forEach(label => {
        link.appendLabel({
            attrs: {
                text: {
                    text: label.text,
                    fill: "#EEE",
                    fontSize: 12
                },
                rect: {
                    fill: "transparent"
                }
            },
            position: {
                distance: label.position
            }
        });
    });

    link.vertices(ldata.vertices);
    link.addTo(paper.model);

    link.metadata = ldata;

    return link;
};

