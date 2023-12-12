return {
    "echasnovski/mini.pairs",
    version = "*",
    -- enabled = false,
    config = function()
        require("mini.pairs").setup({
            modes = { insert = true, command = false, terminal = false },
        })
    end,
}
