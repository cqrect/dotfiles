local servers = {
    "lua_ls",
    "pyright",
    "gopls",
}

return {
    {
        "williamboman/mason.nvim",
        cmd = "Mason",
        build = ":MasonUpdate",
        opts = {
            max_concurrent_installers = 4,
        },
        config = function(_, opts)
            require("mason").setup(opts)
        end,
    },
    {
        "williamboman/mason-lspconfig.nvim",
        opts = {
            ensure_installed = servers,
            automatic_installation = true,
        },
        config = function(_, opts)
            require("mason-lspconfig").setup(opts)
        end,
    },
    {
        "neovim/nvim-lspconfig",
        config = function()
            local opts = {}
            local lspconfig = require("lspconfig")
            for _, server in pairs(servers) do
                opts = {
                    on_attach = require("lsp.handlers").on_attach,
                    capabilities = require("lsp.handlers").capabilities,
                }
                server = vim.split(server, "@")[1]
                local require_ok, conf_opts = pcall(require, "lsp." .. server)
                if require_ok then
                    opts = vim.tbl_deep_extend("force", conf_opts, opts)
                end
                lspconfig[server].setup(opts)
            end
        end,
    },
}
