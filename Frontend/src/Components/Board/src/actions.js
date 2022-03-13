
function click_on_cell_action(clickColIdx) {
    return {
        type: "CELL_CLICKED",
        colIdx: clickColIdx
    }
}

function roll_die_action() {
    return {
        type: "ROLL_DIE",
    }
}
function decrement_health_action(){
    return{
        type: "DECREMENT_HEALTH"
    }
}

function increase_score_action(){
    return{
        type: "INCREASE_SCORE"
    }
}

function heal_self_action(){
    return{
        type: "HEAL_SELF"
    }
}

function award_powerup_action(){
    return{
        type: "PLUNDER"
    }
}

function set_used_powerup_action(selectedPowerup){
    return{
        type: "SET_POWERUP",
        selectedPowerup: selectedPowerup
    }
}

function win_minigame_action(){
    return{
        type: "WIN_MINIGAME"
    }
}

function reset_action() {
    return {
        type: 'RESET',
    }
}

function start_game_action(playerNameArray){
    return{
        type: "START_GAME",
        playerNameArray:playerNameArray
    }
}

export { click_on_cell_action, roll_die_action,reset_action, decrement_health_action,
    increase_score_action, heal_self_action, award_powerup_action, set_used_powerup_action,
    win_minigame_action, start_game_action}
