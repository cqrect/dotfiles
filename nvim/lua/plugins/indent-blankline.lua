return {
    "lukas-reineke/indent-blankline.nvim",
    main = "ibl",
    config = function()
        require("ibl").setup({
            scope = { enabled = false },
            exclude = {
                filetypes = {
                    "help",
                    "trouble",
                    "lazy",
                    "mason",
                    "notify",
                },
            },
        })
    end,
}
