// Part 2: Additional render templates for complex slides

function renderWorkforceTimeline(slide) {
    return `
        <div class="slide flex items-center justify-center p-8" data-slide="${slide.id}">
            <div class="max-w-6xl w-full">
                <h2 class="text-4xl font-bold mb-8 text-center">${slide.title}</h2>
                ${slide.phases.map((phase, idx) => `
                    <div class="glass p-6 rounded-2xl mb-6">
                        <div class="flex items-center justify-between mb-4">
                            <div>
                                <div class="text-2xl font-black text-accent-500">${phase.year}</div>
                                <div class="text-lg font-semibold">${phase.stage}</div>
                            </div>
                            <div class="px-4 py-2 rounded-full ${
                                phase.impactLevel === 'Low' ? 'bg-green-500/20 text-green-400' :
                                phase.impactLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                            }">
                                ${phase.impactLevel} Impact
                            </div>
                        </div>
                        <div class="grid grid-cols-3 gap-4">
                            ${phase.roles.map(role => `
                                <div class="bg-white/5 p-4 rounded-xl">
                                    <div class="text-sm mb-2 line-through text-slate-500">${role.job}</div>
                                    <div class="text-xs text-red-400 mb-2">${role.automation} automated</div>
                                    <div class="text-sm font-semibold text-green-400">${role.newRole}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
                <div class="glass p-6 rounded-2xl bg-blue-500/10 border border-blue-500/30">
                    <p class="text-lg font-semibold">${slide.summary}</p>
                </div>
            </div>
        </div>
    `;
}

function renderSkillMap(slide) {
    return `
        <div class="slide flex items-center justify-center p-8" data-slide="${slide.id}">
            <div class="max-w-6xl w-full">
                <h2 class="text-4xl font-bold mb-8 text-center">${slide.title}</h2>
                <div class="grid grid-cols-2 gap-8">
                    <div class="glass p-6 rounded-2xl border-2 border-red-400">
                        <div class="text-2xl font-bold mb-4 text-red-400">📉 Declining Skills</div>
                        <ul class="space-y-3">
                            ${slide.skills.declining.map(skill => `
                                <li class="flex items-start gap-3">
                                    <span class="text-red-400">↓</span>
                                    <span class="line-through text-slate-400">${skill}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                    <div class="glass p-6 rounded-2xl border-2 border-green-400">
                        <div class="text-2xl font-bold mb-4 text-green-400">📈 Emerging Skills</div>
                        <ul class="space-y-3">
                            ${slide.skills.emerging.map(skill => `
                                <li class="flex items-start gap-3">
                                    <span class="text-green-400">↑</span>
                                    <span>${skill}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                </div>
                <div class="glass p-6 rounded-2xl mt-6 bg-orange-500/10 border border-orange-500/30">
                    <div class="font-bold text-orange-400 mb-2">💡 Recommendation</div>
                    <div>${slide.recommendation}</div>
                </div>
            </div>
        </div>
    `;
}

function renderStrategyPillars(slide) {
    return `
        <div class="slide flex items-center justify-center p-8" data-slide="${slide.id}">
            <div class="max-w-6xl w-full">
                <h2 class="text-4xl font-bold mb-8 text-center">${slide.title}</h2>
                <div class="grid grid-cols-2 gap-6">
                    ${slide.pillars.map(pillar => `
                        <div class="glass p-6 rounded-2xl">
                            <div class="text-5xl font-black text-accent-500 mb-2">${pillar.number}</div>
                            <div class="text-xl font-bold mb-3">${pillar.title}</div>
                            <div class="text-sm text-slate-400 mb-4">${pillar.description}</div>
                            <div class="bg-white/5 p-4 rounded-xl mb-3">
                                <div class="text-xs font-semibold text-green-400 mb-2">Key Actions</div>
                                <ul class="text-xs space-y-1">
                                    ${pillar.actions.map(action => `<li>• ${action}</li>`).join('')}
                                </ul>
                            </div>
                            <div class="flex justify-between text-xs">
                                <div><span class="text-slate-400">Investment:</span> ${pillar.investment}</div>
                                <div><span class="text-green-400">ROI:</span> ${pillar.roi}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function renderROICalculator(slide) {
    const calcROI = (scenario) => {
        const total = scenario.benefits.reduce((sum, b) => {
            const val = parseFloat(b.value.replace(/[^0-9.]/g, ''));
            return sum + val;
        }, 0);
        return total;
    };

    return `
        <div class="slide flex items-center justify-center p-8" data-slide="${slide.id}">
            <div class="max-w-6xl w-full">
                <h2 class="text-4xl font-bold mb-8 text-center">${slide.title}</h2>
                <div class="grid grid-cols-2 gap-6">
                    ${Object.entries(slide.scenarios).map(([key, scenario]) => `
                        <div class="glass p-6 rounded-2xl ${key === 'aggressive' ? 'border-2 border-green-400' : ''}">
                            <div class="text-2xl font-black mb-4 ${key === 'conservative' ? 'text-blue-400' : 'text-green-400'}">
                                ${key.toUpperCase()} Scenario
                            </div>
                            <div class="bg-white/5 p-4 rounded-xl mb-4">
                                <div class="text-sm text-slate-400 mb-2">Investment</div>
                                <div class="text-3xl font-black text-red-400">${scenario.investment}</div>
                            </div>
                            <div class="space-y-2 mb-4">
                                <div class="text-sm font-semibold text-green-400 mb-2">Benefits</div>
                                ${scenario.benefits.map(benefit => `
                                    <div class="flex justify-between text-sm">
                                        <span class="text-slate-400">${benefit.item}</span>
                                        <span class="text-green-400 font-semibold">${benefit.value}</span>
                                    </div>
                                `).join('')}
                            </div>
                            <div class="border-t border-white/10 pt-4">
                                <div class="flex justify-between items-center">
                                    <div>
                                        <div class="text-xs text-slate-400">Total Return</div>
                                        <div class="text-2xl font-black text-green-400">${scenario.total}</div>
                                    </div>
                                    <div>
                                        <div class="text-xs text-slate-400">ROI</div>
                                        <div class="text-4xl font-black text-accent-500">${scenario.roi}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="glass p-6 rounded-2xl mt-6 bg-green-500/10 border border-green-500/30">
                    <div class="font-bold text-green-400 mb-2">💰 Bottom Line</div>
                    <div>${slide.recommendation}</div>
                </div>
            </div>
        </div>
    `;
}

function renderConclusion(slide) {
    return `
        <div class="slide flex items-center justify-center p-8" data-slide="${slide.id}">
            <div class="max-w-5xl w-full">
                <h2 class="text-5xl font-black mb-12 text-center gradient-text">${slide.title}</h2>
                <div class="space-y-6 mb-12">
                    <div class="glass p-6 rounded-2xl">
                        <div class="font-bold text-red-400 mb-2">⚠️ The Challenge</div>
                        <div class="text-lg">${slide.conclusion.challenge}</div>
                    </div>
                    <div class="glass p-6 rounded-2xl">
                        <div class="font-bold text-blue-400 mb-2">💎 The Opportunity</div>
                        <div class="text-lg">${slide.conclusion.opportunity}</div>
                    </div>
                    <div class="glass p-6 rounded-2xl">
                        <div class="font-bold text-orange-400 mb-2">⏰ The Urgency</div>
                        <div class="text-lg">${slide.conclusion.urgency}</div>
                    </div>
                    <div class="glass p-6 rounded-2xl bg-green-500/10 border-2 border-green-400">
                        <div class="font-bold text-green-400 mb-2">🎯 The Action</div>
                        <div class="text-lg">${slide.conclusion.action}</div>
                    </div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-black gradient-text">${slide.cta}</div>
                </div>
            </div>
        </div>
    `;
}
