# CCM Dashboard — Linear Roadmap

**Project Start Date**: 2026-01-05  
**Project Owner**: Timothy Miamba  
**Project Sponsor**: Data Systems Manager  
**Estimated Completion**: 2026-08-31 (core pages)

---

## Project Goals

### Primary Goal
Build a production-ready CCM Dashboard with all core pages connected to live Supabase data, replacing mock data implementations with real database queries and ensuring stakeholder acceptance through iterative review cycles.

### Success Criteria
- ✅ All 11 core pages implemented with live Supabase data
- ✅ Data Manager approval obtained before each page build
- ✅ Stakeholder acceptance achieved for each page
- ✅ Consistent UX patterns established (filters, exports, project summary access)
- ✅ Performance and access control validated for data extraction features

---

## Project Milestones

### Milestone 1: Overview Page Completion
**Target Date**: 2026-01-17  
**Status**: In Progress  
**Dependencies**: None

**Deliverables**:
- Project Summary displayed inline at top (Overview page only)
- Removed Active Stoves Per VPA, Data Quality Alerts, Survey Completion components
- Stakeholder demo-ready version

**Key Dates**:
- 2026-01-08: Stakeholder review #1 (demo)
- 2026-01-12: Stakeholder review #2 (demo + data walkthrough)
- 2026-01-17: Final acceptance

---

### Milestone 2: Inspections Page
**Target Date**: 2026-02-14  
**Status**: Not Started  
**Dependencies**: Milestone 1

**Deliverables**:
- Live Supabase data for inspections
- Filters (date range, VPA, result)
- Export functionality
- Trend charts with real data
- Stakeholder acceptance

**Key Dates**:
- 2026-01-13: Data Manager pre-review (Gate 1)
- 2026-02-07: MVP demo to stakeholders
- 2026-02-14: Final acceptance

---

### Milestone 3: Households Page
**Target Date**: 2026-03-14  
**Status**: Not Started  
**Dependencies**: Milestone 2

**Deliverables**:
- Live household data with inspection status
- Filter bar integration
- Export functionality
- Inspection status distribution
- Stakeholder acceptance

**Key Dates**:
- 2026-02-10: Data Manager pre-review (Gate 1)
- 2026-03-07: MVP demo to stakeholders
- 2026-03-14: Final acceptance

---

### Milestone 4: Coordinator Monthly Reports
**Target Date**: 2026-04-11  
**Status**: Not Started  
**Dependencies**: Milestone 3

**Deliverables**:
- Coordinator report data from database
- Filter and export functionality
- Success/challenge tracking
- Submission status tracking
- Stakeholder acceptance

**Key Dates**:
- 2026-03-10: Data Manager pre-review (Gate 1)
- 2026-04-04: MVP demo to stakeholders
- 2026-04-11: Final acceptance

---

### Milestone 5: CV Performance Page
**Target Date**: 2026-05-03  
**Status**: Not Started  
**Dependencies**: Milestone 4

**Deliverables**:
- CV performance metrics from database
- Performance ratings and trends
- Filter and export functionality
- Progress tracking visualization
- Stakeholder acceptance

**Key Dates**:
- 2026-04-01: Data Manager pre-review (Gate 1)
- 2026-04-26: MVP demo to stakeholders
- 2026-05-03: Final acceptance

---

### Milestone 6: Staff Page
**Target Date**: 2026-05-24  
**Status**: Not Started  
**Dependencies**: Milestone 5

**Deliverables**:
- Live staff data from database
- Training hours tracking
- Position distribution
- Filter and export functionality
- Stakeholder acceptance

**Key Dates**:
- 2026-04-22: Data Manager pre-review (Gate 1)
- 2026-05-17: MVP demo to stakeholders
- 2026-05-24: Final acceptance

---

### Milestone 7: Usage Surveys Page
**Target Date**: 2026-06-21  
**Status**: Not Started  
**Dependencies**: Milestone 6

**Deliverables**:
- Usage survey data from database
- CCM usage status tracking
- Filter and export functionality
- Survey completion metrics
- Stakeholder acceptance

**Key Dates**:
- 2026-05-13: Data Manager pre-review (Gate 1)
- 2026-06-14: MVP demo to stakeholders
- 2026-06-21: Final acceptance

---

### Milestone 8: Not Active Page
**Target Date**: 2026-07-05  
**Status**: Not Started  
**Dependencies**: Milestone 7

**Deliverables**:
- Not active household tracking
- Reason categorization
- Filter and export functionality
- Stakeholder acceptance

**Key Dates**:
- 2026-06-10: Data Manager pre-review (Gate 1)
- 2026-06-28: MVP demo to stakeholders
- 2026-07-05: Final acceptance

---

### Milestone 9: Archived Page
**Target Date**: 2026-07-19  
**Status**: Not Started  
**Dependencies**: Milestone 8

**Deliverables**:
- Archived records tracking
- Restore functionality (if applicable)
- Filter and export functionality
- Stakeholder acceptance

**Key Dates**:
- 2026-06-24: Data Manager pre-review (Gate 1)
- 2026-07-12: MVP demo to stakeholders
- 2026-07-19: Final acceptance

---

### Milestone 10: Data Extraction Page
**Target Date**: 2026-08-23  
**Status**: Not Started  
**Dependencies**: Milestone 9

**Deliverables**:
- Multi-dataset export functionality
- Field selection UI
- Export format options (CSV, Excel, JSON)
- Access control implementation
- Performance optimization
- Stakeholder acceptance

**Key Dates**:
- 2026-07-08: Data Manager pre-review (Gate 1)
- 2026-08-16: MVP demo to stakeholders
- 2026-08-23: Final acceptance

---

### Milestone 11: Local Authorities Page
**Target Date**: 2026-08-31  
**Status**: Not Started  
**Dependencies**: Milestone 10

**Deliverables**:
- Local authority data from database
- CCM count aggregation
- Filter and export functionality
- Access control (least privilege)
- Stakeholder acceptance

**Key Dates**:
- 2026-08-05: Data Manager pre-review (Gate 1)
- 2026-08-26: MVP demo to stakeholders
- 2026-08-31: Final acceptance

---

## Issues / Tasks Breakdown

### Milestone 1: Overview Page

#### Task 1.1: Remove Omitted Components
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 2h

**Description**:
- Remove Active Stoves Per VPA component from Overview page
- Remove Data Quality Alerts component from Overview page
- Remove Survey Completion component from Overview page
- Update page layout accordingly

**Acceptance Criteria**:
- Components removed from Overview page
- No broken imports or references
- Layout remains clean and functional

---

#### Task 1.2: Implement Inline Project Summary
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 4h

**Description**:
- Create new component variant for inline Project Summary (Overview page only)
- Display Project Summary at top of Overview page alongside stat cards
- Maintain Project Summary dialog pattern for all other pages
- Ensure real-time updates work correctly

**Acceptance Criteria**:
- Project Summary visible inline on Overview page
- All 9 summary metrics displayed correctly
- Real-time updates functioning
- Dialog version still works on other pages

---

#### Task 1.3: Prepare Stakeholder Demo Materials
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 2h

**Description**:
- Prepare demo walkthrough for 2026-01-08 review
- Document what's real data vs placeholder
- Create feedback capture mechanism

**Acceptance Criteria**:
- Demo script ready
- Clear documentation of data status
- Feedback tracking system in place

---

#### Task 1.4: Incorporate Stakeholder Feedback
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 8h

**Description**:
- Review feedback from 2026-01-08 and 2026-01-12 meetings
- Implement requested changes
- Re-demo if needed

**Acceptance Criteria**:
- All stakeholder feedback addressed
- Changes tested and validated
- Final approval obtained

---

### Milestone 2: Inspections Page

#### Task 2.1: Data Manager Pre-Review
**Assignee**: Data Manager  
**Priority**: High  
**Status**: To Do  
**Estimate**: 2h (review time)

**Description**:
- Review inspection data requirements
- Confirm KPI definitions
- Approve filter options
- Sign off on export requirements

**Acceptance Criteria**:
- Data Manager approval obtained
- Requirements documented
- Data mapping confirmed

---

#### Task 2.2: Create Supabase Queries/RPCs
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 8h

**Description**:
- Replace mock data imports with Supabase queries
- Create/update RPC functions for inspection stats
- Implement date range filtering at database level
- Optimize queries for performance

**Acceptance Criteria**:
- All inspection data comes from Supabase
- Queries performant (<500ms)
- Error handling implemented

---

#### Task 2.3: Implement Filters
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 4h

**Description**:
- Connect date range filters to queries
- Implement VPA filter
- Implement result filter (pass/needs_attention/fail)
- Update table/charts based on filters

**Acceptance Criteria**:
- All filters working correctly
- Real-time updates on filter change
- URL state management (if applicable)

---

#### Task 2.4: Implement Export Functionality
**Assignee**: Timothy Miamba  
**Priority**: Medium  
**Status**: To Do  
**Estimate**: 6h

**Description**:
- Create export API endpoint or server action
- Implement CSV export
- Add Excel export option
- Apply filters to export

**Acceptance Criteria**:
- Export works with current filters
- CSV format correct
- Excel format correct
- Large exports handled gracefully

---

#### Task 2.5: Update Charts with Real Data
**Assignee**: Timothy Miamba  
**Priority**: Medium  
**Status**: To Do  
**Estimate**: 4h

**Description**:
- Replace mock monthly data with real database queries
- Implement trend calculations
- Update chart tooltips and legends

**Acceptance Criteria**:
- Charts display real data
- Trends calculated correctly
- Performance acceptable

---

#### Task 2.6: Stakeholder Review & Iteration
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 12h

**Description**:
- Demo MVP to stakeholders
- Capture feedback
- Implement changes
- Re-demo if needed

**Acceptance Criteria**:
- Stakeholder approval obtained
- All feedback addressed
- Page marked as complete

---

### Milestone 3: Households Page

#### Task 3.1: Data Manager Pre-Review
**Assignee**: Data Manager  
**Priority**: High  
**Status**: To Do  
**Estimate**: 2h

**Description**:
- Review household data requirements
- Confirm inspection status definitions (0-3 / 3-6 / 6+ / uninspected)
- Approve archived flag logic
- Sign off on filter options

**Acceptance Criteria**:
- Data Manager approval obtained
- Status definitions documented
- Data mapping confirmed

---

#### Task 3.2: Create Supabase Queries/RPCs
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 8h

**Description**:
- Replace mock data with Supabase queries
- Create RPC for inspection status calculation
- Implement household filtering queries
- Optimize for performance

**Acceptance Criteria**:
- All household data from Supabase
- Inspection status calculated correctly
- Queries performant

---

#### Task 3.3: Integrate Filter Bar
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 4h

**Description**:
- Connect FilterBar component to real queries
- Implement inspection period filter
- Update table based on filters

**Acceptance Criteria**:
- All filters working
- Table updates correctly
- Performance acceptable

---

#### Task 3.4: Implement Export
**Assignee**: Timothy Miamba  
**Priority**: Medium  
**Status**: To Do  
**Estimate**: 4h

**Description**:
- Reuse export patterns from Inspections
- Implement household-specific export
- Apply filters to export

**Acceptance Criteria**:
- Export works correctly
- Filters applied to export
- Format correct

---

#### Task 3.5: Stakeholder Review & Iteration
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 12h

**Description**:
- Demo MVP to stakeholders
- Capture feedback
- Implement changes

**Acceptance Criteria**:
- Stakeholder approval obtained
- Page marked as complete

---

### Milestone 4: Coordinator Monthly Reports

#### Task 4.1: Data Manager Pre-Review
**Assignee**: Data Manager  
**Priority**: High  
**Status**: To Do  
**Estimate**: 2h

**Description**:
- Review coordinator report data structure
- Confirm report fields and format
- Approve success/challenge categorization
- Sign off on submission tracking

**Acceptance Criteria**:
- Data Manager approval obtained
- Report structure documented

---

#### Task 4.2: Create Supabase Queries
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 6h

**Description**:
- Identify report data source in database
- Create queries for report retrieval
- Implement submission status tracking
- Handle pending vs submitted states

**Acceptance Criteria**:
- Reports loaded from database
- Status tracked correctly
- Queries performant

---

#### Task 4.3: Implement Filters & Export
**Assignee**: Timothy Miamba  
**Priority**: Medium  
**Status**: To Do  
**Estimate**: 4h

**Description**:
- Connect filters to queries
- Implement export functionality
- Handle date range filtering

**Acceptance Criteria**:
- Filters working
- Export functional
- Performance acceptable

---

#### Task 4.4: Stakeholder Review & Iteration
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 10h

**Description**:
- Demo MVP to stakeholders
- Capture feedback
- Implement changes

**Acceptance Criteria**:
- Stakeholder approval obtained
- Page marked as complete

---

### Milestone 5: CV Performance

#### Task 5.1: Data Manager Pre-Review
**Assignee**: Data Manager  
**Priority**: High  
**Status**: To Do  
**Estimate**: 2h

**Description**:
- Review CV performance definitions
- Confirm target calculations
- Approve rating formulas
- Sign off on trend calculations

**Acceptance Criteria**:
- Data Manager approval obtained
- Performance metrics defined

---

#### Task 5.2: Create Performance Calculations
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 8h

**Description**:
- Create RPC functions for CV performance metrics
- Implement target vs actual calculations
- Calculate performance ratings
- Implement trend analysis

**Acceptance Criteria**:
- Calculations correct
- Performance acceptable
- Data accurate

---

#### Task 5.3: Implement Filters & Export
**Assignee**: Timothy Miamba  
**Priority**: Medium  
**Status**: To Do  
**Estimate**: 4h

**Description**:
- Connect filters to performance queries
- Implement export functionality
- Update progress visualizations

**Acceptance Criteria**:
- Filters working
- Export functional
- Visualizations accurate

---

#### Task 5.4: Stakeholder Review & Iteration
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 10h

**Description**:
- Demo MVP to stakeholders
- Capture feedback
- Implement changes

**Acceptance Criteria**:
- Stakeholder approval obtained
- Page marked as complete

---

### Milestone 6: Staff Page

#### Task 6.1: Data Manager Pre-Review
**Assignee**: Data Manager  
**Priority**: High  
**Status**: To Do  
**Estimate**: 2h

**Description**:
- Review staff data requirements
- Confirm position hierarchy
- Approve training hours tracking
- Sign off on active/inactive definitions

**Acceptance Criteria**:
- Data Manager approval obtained
- Requirements documented

---

#### Task 6.2: Create Supabase Queries
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 6h

**Description**:
- Replace mock data with Supabase queries
- Create staff statistics queries
- Implement position distribution calculations
- Handle training hours aggregation

**Acceptance Criteria**:
- All data from Supabase
- Calculations correct
- Performance acceptable

---

#### Task 6.3: Implement Filters & Export
**Assignee**: Timothy Miamba  
**Priority**: Medium  
**Status**: To Do  
**Estimate**: 4h

**Description**:
- Connect filters to queries
- Implement export functionality
- Update charts with real data

**Acceptance Criteria**:
- Filters working
- Export functional
- Charts accurate

---

#### Task 6.4: Stakeholder Review & Iteration
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 10h

**Description**:
- Demo MVP to stakeholders
- Capture feedback
- Implement changes

**Acceptance Criteria**:
- Stakeholder approval obtained
- Page marked as complete

---

### Milestone 7: Usage Surveys

#### Task 7.1: Data Manager Pre-Review
**Assignee**: Data Manager  
**Priority**: High  
**Status**: To Do  
**Estimate**: 2h

**Description**:
- Review usage survey data structure
- Confirm survey fields and metrics
- Approve CCM usage tracking logic
- Sign off on completion definitions

**Acceptance Criteria**:
- Data Manager approval obtained
- Survey structure documented

---

#### Task 7.2: Create Supabase Queries
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 8h

**Description**:
- Replace mock data with Supabase queries
- Create survey statistics queries
- Implement usage status calculations
- Handle survey completion tracking

**Acceptance Criteria**:
- All data from Supabase
- Calculations correct
- Performance acceptable

---

#### Task 7.3: Implement Filters & Export
**Assignee**: Timothy Miamba  
**Priority**: Medium  
**Status**: To Do  
**Estimate**: 4h

**Description**:
- Connect filters to queries
- Implement export functionality
- Update charts with real data

**Acceptance Criteria**:
- Filters working
- Export functional
- Charts accurate

---

#### Task 7.4: Stakeholder Review & Iteration
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 14h

**Description**:
- Demo MVP to stakeholders
- Capture feedback (expect more than average)
- Implement changes
- Iterate as needed

**Acceptance Criteria**:
- Stakeholder approval obtained
- Page marked as complete

---

### Milestone 8: Not Active Page

#### Task 8.1: Data Manager Pre-Review
**Assignee**: Data Manager  
**Priority**: High  
**Status**: To Do  
**Estimate**: 2h

**Description**:
- Review "not active" reason categories
- Confirm source-of-truth fields
- Approve reason tracking logic

**Acceptance Criteria**:
- Data Manager approval obtained
- Reason categories standardized

---

#### Task 8.2: Create Supabase Queries
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 4h

**Description**:
- Replace mock data with Supabase queries
- Implement reason-based filtering
- Create aggregation queries

**Acceptance Criteria**:
- All data from Supabase
- Filters working correctly

---

#### Task 8.3: Implement Filters & Export
**Assignee**: Timothy Miamba  
**Priority**: Medium  
**Status**: To Do  
**Estimate**: 3h

**Description**:
- Connect filters to queries
- Implement export functionality

**Acceptance Criteria**:
- Filters working
- Export functional

---

#### Task 8.4: Stakeholder Review & Iteration
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 8h

**Description**:
- Demo MVP to stakeholders
- Capture feedback
- Implement changes

**Acceptance Criteria**:
- Stakeholder approval obtained
- Page marked as complete

---

### Milestone 9: Archived Page

#### Task 9.1: Data Manager Pre-Review
**Assignee**: Data Manager  
**Priority**: High  
**Status**: To Do  
**Estimate**: 2h

**Description**:
- Review archive data structure
- Clarify restore behavior (UI-only vs true restore)
- Approve archive reason tracking

**Acceptance Criteria**:
- Data Manager approval obtained
- Restore behavior defined

---

#### Task 9.2: Create Supabase Queries
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 4h

**Description**:
- Replace mock data with Supabase queries
- Implement archive type filtering
- Create restore functionality (if applicable)

**Acceptance Criteria**:
- All data from Supabase
- Restore working (if implemented)

---

#### Task 9.3: Implement Filters & Export
**Assignee**: Timothy Miamba  
**Priority**: Medium  
**Status**: To Do  
**Estimate**: 3h

**Description**:
- Connect filters to queries
- Implement export functionality

**Acceptance Criteria**:
- Filters working
- Export functional

---

#### Task 9.4: Stakeholder Review & Iteration
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 8h

**Description**:
- Demo MVP to stakeholders
- Capture feedback
- Implement changes

**Acceptance Criteria**:
- Stakeholder approval obtained
- Page marked as complete

---

### Milestone 10: Data Extraction Page

#### Task 10.1: Data Manager Pre-Review
**Assignee**: Data Manager  
**Priority**: High  
**Status**: To Do  
**Estimate**: 3h

**Description**:
- Review export requirements per dataset
- Define access control rules (who can export what)
- Approve field selection options
- Sign off on export format requirements

**Acceptance Criteria**:
- Data Manager approval obtained
- Access control defined
- Export requirements documented

---

#### Task 10.2: Implement Access Control
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 6h

**Description**:
- Implement role-based access control
- Create permission checks for exports
- Secure export endpoints
- Add audit logging

**Acceptance Criteria**:
- Access control working
- Permissions enforced
- Audit trail in place

---

#### Task 10.3: Create Multi-Dataset Export System
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 12h

**Description**:
- Create export API endpoints for each dataset
- Implement field selection logic
- Support CSV, Excel, JSON formats
- Optimize for large exports
- Add progress indicators

**Acceptance Criteria**:
- All datasets exportable
- Field selection working
- All formats supported
- Performance acceptable for large exports

---

#### Task 10.4: Implement Export Presets
**Assignee**: Timothy Miamba  
**Priority**: Medium  
**Status**: To Do  
**Estimate**: 4h

**Description**:
- Create quick export preset configurations
- Implement preset selection UI
- Save common export configurations

**Acceptance Criteria**:
- Presets working
- UI intuitive
- Configurations saved

---

#### Task 10.5: Performance Optimization
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 6h

**Description**:
- Optimize export queries
- Implement pagination/chunking for large exports
- Add timeout handling
- Test with realistic data volumes

**Acceptance Criteria**:
- Exports performant
- Large exports handled gracefully
- No timeouts on reasonable datasets

---

#### Task 10.6: Stakeholder Review & Iteration
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 14h

**Description**:
- Demo MVP to stakeholders
- Capture feedback
- Implement changes
- Security review

**Acceptance Criteria**:
- Stakeholder approval obtained
- Security validated
- Page marked as complete

---

### Milestone 11: Local Authorities Page

#### Task 11.1: Data Manager Pre-Review
**Assignee**: Data Manager  
**Priority**: High  
**Status**: To Do  
**Estimate**: 2h

**Description**:
- Review local authority data structure
- Confirm CCM count aggregation logic
- Approve access restrictions (least privilege)
- Sign off on display requirements

**Acceptance Criteria**:
- Data Manager approval obtained
- Access control defined
- Requirements documented

---

#### Task 11.2: Implement Access Control
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 3h

**Description**:
- Implement role-based access restrictions
- Create permission checks
- Ensure safe-by-default behavior

**Acceptance Criteria**:
- Access control working
- Restrictions enforced
- Safe defaults in place

---

#### Task 11.3: Create Supabase Queries
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 4h

**Description**:
- Replace mock data with Supabase queries
- Create CCM count aggregation queries
- Implement filtering by district/VPA

**Acceptance Criteria**:
- All data from Supabase
- Aggregations correct
- Performance acceptable

---

#### Task 11.4: Implement Filters & Export
**Assignee**: Timothy Miamba  
**Priority**: Medium  
**Status**: To Do  
**Estimate**: 3h

**Description**:
- Connect filters to queries
- Implement export functionality

**Acceptance Criteria**:
- Filters working
- Export functional

---

#### Task 11.5: Stakeholder Review & Iteration
**Assignee**: Timothy Miamba  
**Priority**: High  
**Status**: To Do  
**Estimate**: 8h

**Description**:
- Demo MVP to stakeholders
- Capture feedback
- Implement changes

**Acceptance Criteria**:
- Stakeholder approval obtained
- Page marked as complete

---

## Labels & Status

### Priority Labels
- **P0 - Critical**: Blocks other work or has hard deadline
- **P1 - High**: Important for milestone completion
- **P2 - Medium**: Should be done but not blocking
- **P3 - Low**: Nice to have, can be deferred

### Status Labels
- **Backlog**: Not yet started
- **Ready**: Data Manager approved, ready to start
- **In Progress**: Currently being worked on
- **In Review**: Awaiting stakeholder feedback
- **Done**: Completed and accepted

### Type Labels
- **Feature**: New functionality
- **Bug**: Fix for existing issue
- **Enhancement**: Improvement to existing feature
- **Documentation**: Documentation work
- **Review**: Review/approval task

---

## Dependencies Graph

```
Milestone 1 (Overview)
  └─> Milestone 2 (Inspections)
      └─> Milestone 3 (Households)
          └─> Milestone 4 (Coordinator Reports)
              └─> Milestone 5 (CV Performance)
                  └─> Milestone 6 (Staff)
                      └─> Milestone 7 (Usage Surveys)
                          └─> Milestone 8 (Not Active)
                              └─> Milestone 9 (Archived)
                                  └─> Milestone 10 (Data Extraction)
                                      └─> Milestone 11 (Local Authorities)
```

**Note**: While milestones are sequential, some tasks can be pipelined (e.g., Data Manager pre-review for next page while current page is in stakeholder review).

---

## Risk Register

### Risk 1: High Stakeholder Feedback Volume
**Probability**: High  
**Impact**: Medium  
**Mitigation**: 
- Budget extra time for January reviews (already included)
- Create structured feedback capture process
- Set clear expectations on change scope

### Risk 2: Fieldwork Week Disruption
**Probability**: High  
**Impact**: Medium  
**Mitigation**:
- Plan assumes 1 week/month unavailable
- Buffer time included in estimates
- Flexible milestone dates

### Risk 3: Data Definition Churn
**Probability**: Medium  
**Impact**: High  
**Mitigation**:
- Data Manager pre-review gate before each page
- Document definitions early
- Single source of truth for metrics

### Risk 4: Export Performance Issues
**Probability**: Medium  
**Impact**: High  
**Mitigation**:
- Early performance testing
- Implement pagination/chunking
- Set clear limits and expectations

### Risk 5: Access Control Complexity
**Probability**: Medium  
**Impact**: High  
**Mitigation**:
- Early access control decisions
- Implement patterns early (Data Extraction page)
- Security review before production

---

## Success Metrics

### Development Metrics
- **Velocity**: Average tasks completed per week
- **Cycle Time**: Time from "Ready" to "Done"
- **Review Time**: Time in "In Review" status
- **Rework Rate**: Percentage of tasks requiring changes after review

### Quality Metrics
- **Bug Rate**: Bugs found per page after completion
- **Performance**: Page load times, query performance
- **Accessibility**: WCAG compliance checks

### Stakeholder Metrics
- **Satisfaction**: Stakeholder approval rate per page
- **Feedback Volume**: Number of change requests per page
- **Time to Acceptance**: Days from MVP demo to final approval

---

## Notes for Linear Setup

1. **Create Project**: "CCM Dashboard Implementation"
2. **Set Start Date**: 2026-01-05
3. **Create Milestones**: Use the 11 milestones defined above
4. **Create Labels**: Use the labels defined in "Labels & Status" section
5. **Create Issues**: Convert each task into a Linear issue
6. **Set Dependencies**: Link issues based on dependencies graph
7. **Assign Milestones**: Attach issues to appropriate milestones
8. **Set Estimates**: Use the estimates provided for each task
9. **Create Roadmap View**: Use Linear Roadmap to visualize timeline
10. **Set Up Workflows**: Configure status transitions (Backlog → Ready → In Progress → In Review → Done)

---

## Review & Update Cadence

- **Weekly**: Update task status, log blockers
- **Bi-weekly**: Review milestone progress, adjust estimates if needed
- **Per Milestone**: Post-mortem, capture learnings
- **Monthly**: Review overall timeline, adjust if needed

---

**Document Version**: 1.0  
**Last Updated**: 2026-01-05  
**Next Review**: 2026-01-12

