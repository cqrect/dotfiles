return {
    "mfussenegger/nvim-dap",
    dependencies = {
        {
            "rcarriga/nvim-dap-ui",
            keys = {
                {
                    "<leader>u",
                    function()
                        require("dapui").toggle()
                    end,
                    desc = "Dap UI",
                },
            },
            opts = {},
            config = function()
                local dap = require("dap")
                local dapui = require("dapui")
                dapui.setup({})
                dap.listeners.after.event_initialized["dapui_config"] = function()
                    dapui.open({})
                end
                dap.listeners.before.event_terminated["dapui_config"] = function()
                    dapui.close({})
                end
                dap.listeners.before.event_exited["dapui_config"] = function()
                    dapui.close({})
                end
            end,
        },
        {
            "theHamsta/nvim-dap-virtual-text",
            opts = {},
        },
        {
            "jay-babu/mason-nvim-dap.nvim",
            dependencies = "mason.nvim",
            cmd = { "DapInstall", "DapUninstall" },
            opts = {
                automatic_installation = true,
                handlers = {},
                ensure_installed = {},
            },
        },
    },
    keys = {
        {
            "<leader>b",
            function()
                require("dap").toggle_breakpoint()
            end,
            desc = "Toggle Breakpoint",
        },
        {
            "<leader>d",
            function()
                require("dap").continue()
            end,
            desc = "Continue",
        },
        {
            "<leader>n",
            function()
                require("dap").run_to_cursor()
            end,
            desc = "Run to Cursor",
        },
        {
            "<C-p>",
            function()
                require("dap").step_into()
            end,
            desc = "Step Into",
        },
        {
            "<C-n>",
            function()
                require("dap").step_over()
            end,
            desc = "Step Over",
        },
        {
            "<leader>t",
            function()
                require("dap").terminate()
            end,
            desc = "Terminate",
        },
    },
    config = function()
        vim.api.nvim_set_hl(0, "DapBreakpoint", { ctermbg = 0, fg = "#993939", bg = "#31353f" })
        vim.api.nvim_set_hl(0, "DapLogPoint", { ctermbg = 0, fg = "#61afef", bg = "#31353f" })
        vim.api.nvim_set_hl(0, "DapStopped", { ctermbg = 0, fg = "#98c379", bg = "#31353f" })

        vim.fn.sign_define(
            "DapBreakpoint",
            { text = "", texthl = "DapBreakpoint", linehl = "DapBreakpoint", numhl = "DapBreakpoint" }
        )
        vim.fn.sign_define(
            "DapBreakpointCondition",
            { text = "", texthl = "DapBreakpoint", linehl = "DapBreakpoint", numhl = "DapBreakpoint" }
        )
        vim.fn.sign_define(
            "DapBreakpointRejected",
            { text = "", texthl = "DapBreakpoint", linehl = "DapBreakpoint", numhl = "DapBreakpoint" }
        )
        vim.fn.sign_define(
            "DapLogPoint",
            { text = "", texthl = "DapLogPoint", linehl = "DapLogPoint", numhl = "DapLogPoint" }
        )
        vim.fn.sign_define(
            "DapStopped",
            { text = "", texthl = "DapStopped", linehl = "DapStopped", numhl = "DapStopped" }
        )
    end,
}
