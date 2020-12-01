﻿function isNearby(x) {
    if (x == 'none') {
        return true;
    } else {
        for (var qx = Math.floor(xpos) - 5; qx < Math.floor(xpos) + 5; qx++) {
            for (var qy = Math.floor(ypos) - 5; qy < Math.floor(ypos) + 5; qy++) {
                if ((((xpos - qx) ** 2) + ((ypos - qy) ** 2)) ** (1 / 2) <= 5 && blocks[qy][qx] == x) {
                    return true;
                }
            }
        }
        return false;
    }
}
function dealWithClicks() {
    var placabli = [];
    for (var e = 0; e < placable.length; e++) {
        placabli.push(placable[e][0]);
    }
    if (myGameArea.click && myGameArea.x < 700 && myGameArea.x > 0 && myGameArea.y < 700 && myGameArea.y > 0) {
        if (myGameArea.x > 70 && myGameArea.x < 630 && myGameArea.y > 600 && myGameArea.y < 680) {
            selectIndex = Math.floor((myGameArea.x - 70) / 80);
            clickCount = 1;
        } else {
            if (myGameArea.keys[16] && myGameArea.keys && myGameArea.getc() == 'ch') {
                screenNum = 3;
                sx = myGameArea.x;
                sy = myGameArea.y;
            }
            var k = true;
            for (var o = 0; o < mobs.length; o++) {
                if (xpos + myGameArea.x / 100 - 3 < mobs[o].x + 1 && xpos + myGameArea.x / 100 - 3 > mobs[o].x && ypos + myGameArea.y / 100 - 3 < mobs[o].y + 1 && ypos + myGameArea.y / 100 - 3 > mobs[o].y) {
                    k = false;
                    if (mobs[o].dmgc == 0) {
                        mobs[o].dmgc = 25;
                        mobs[o].h -= (data.dmg[inventory[selectIndex][0]] ?? data.dmg['def']);
                        if (mobs[o].h <= 0) {
                            mobs[o].die();
                        }
                    }
                }
            }
            myGameArea.click = false;
            if (k) {
                if (myGameArea.getc() == defaultTile[biomes[Math.floor(ypos + myGameArea.y / 100 - 3) * width + Math.floor(xpos + myGameArea.x / 100 - 3)]]) {
                    if (!((Math.floor(ypos) == Math.floor(ypos + myGameArea.y / 100 - 3) || Math.ceil(ypos) == Math.floor(ypos + myGameArea.y / 100 - 3)) && (Math.floor(xpos) == Math.floor(xpos + myGameArea.x / 100 - 3) || Math.ceil(xpos) == Math.floor(xpos + myGameArea.x / 100 - 3)))) {
                        if (placabli.includes(inventory[selectIndex] ? (inventory[selectIndex][0] ? inventory[selectIndex][0] : 'no') : 'no')) {
                            myGameArea.setc(placable[placabli.indexOf(inventory[selectIndex][0] ? inventory[selectIndex][0] : 'no')][1]);
                            myGameArea.add(inventory[selectIndex][0], -1);
                        }
                    }
                } else {
                    if (lastClick.x != Math.floor(xpos + myGameArea.x / 100 - 3) || lastClick.y != Math.floor(ypos + myGameArea.y / 100 - 3)) {
                        clickCount = 1;
                    } else {
                        clickCount += 1;
                    }
                    myGameArea.click = false;
                    var a = inventory[selectIndex] ? inventory[selectIndex] : 'def';
                    var mq = maxClicks[myGameArea.getc()][a[0]] ? maxClicks[myGameArea.getc()][a[0]] : maxClicks[myGameArea.getc()]['def'];
                    var dq = dropitem[myGameArea.getc()][a[0]] ? a[0] : 'def';
                    if (clickCount == mq) {
                        dropblocs.push({
                            item: dropitem[myGameArea.getc()][dq][0],
                            num: Math.floor(Math.random() * (dropitem[myGameArea.getc()][dq][1][1] - dropitem[myGameArea.getc()][dq][1][0] + 1)) + dropitem[myGameArea.getc()][dq][1][0],
                            xp: Math.floor(xpos + myGameArea.x / 100 - 3),
                            yp: Math.floor(ypos + myGameArea.y / 100 - 3)
                        });
                        myGameArea.setc(defaultTile[biomes[Math.floor(ypos + myGameArea.y / 100 - 3) * width + Math.floor(xpos + myGameArea.x / 100 - 3)]]);
                    }
                    lastClick.x = Math.floor(xpos + myGameArea.x / 100 - 3);
                    lastClick.y = Math.floor(ypos + myGameArea.y / 100 - 3);
                }
            }
        }
    }
}
function clearBlanks() {
    for (var v = 0; v < inventory.length; v++) {
        if (inventory[v][1] === 0) {
            inventory.push(['e' + count, '']);
            inventory.splice(v, 1);
            count++;
        }
    }
}
function dealWithSwaps() {
    if (myGameArea.click && myGameArea.x > 50 && myGameArea.x < 610 && myGameArea.y > 50 && myGameArea.y < 208) {
        if (invIndex == -1) {
            invIndex = Math.floor((myGameArea.x - 50) / 56) + 10 * Math.floor((myGameArea.y - 50) / 56);
        } else {
            var f = [];
            for (var p = 0; p < inventory.length; p++) {
                f.push(inventory[p][0]);
            }
            var h = inventory[f.indexOf(inventory[invIndex][0])];
            inventory[f.indexOf(inventory[invIndex][0])] = inventory[f.indexOf(inventory[Math.floor((myGameArea.x - 50) / 56) + 10 * Math.floor((myGameArea.y - 50) / 56)][0])];
            inventory[f.indexOf(inventory[Math.floor((myGameArea.x - 50) / 56) + 10 * Math.floor((myGameArea.y - 50) / 56)][0])] = h;
            invIndex = -1;
        }
        myGameArea.click = false;
    } else if (myGameArea.click) {
        invIndex = -1;
    }
}
function dealWithCrafts(arecc) {
    if (myGameArea.click && myGameArea.x < 610 && myGameArea.y > 250 && myGameArea.x > 50) {
        myGameArea.click = false;
        if (arecc[(Math.floor((myGameArea.y - 250) / 56) * 10) + Math.floor((myGameArea.x - 50) / 56)]) {
            var t = [];
            for (var p = 0; p < inventory.length; p++) {
                t.push(inventory[p][0]);
            }
            for (r in arecc[(Math.floor((myGameArea.y - 250) / 56) * 10) + Math.floor((myGameArea.x - 50) / 56)][1]) {
                inventory[t.indexOf(arecc[(Math.floor((myGameArea.y - 250) / 56) * 10) + Math.floor((myGameArea.x - 50) / 56)][1][r][0])][1] -= arecc[(Math.floor((myGameArea.y - 250) / 56) * 10) + Math.floor((myGameArea.x - 50) / 56)][1][r][1];
                arecc[(Math.floor((myGameArea.y - 250) / 56) * 10) + Math.floor((myGameArea.x - 50) / 56)][1][r];
            }
            myGameArea.add(arecc[(Math.floor((myGameArea.y - 250) / 56) * 10) + Math.floor((myGameArea.x - 50) / 56)][0][0], arecc[(Math.floor((myGameArea.y - 250) / 56) * 10) + Math.floor((myGameArea.x - 50) / 56)][0][1]);
        }
    }
}